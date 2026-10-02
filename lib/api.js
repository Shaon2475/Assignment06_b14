const API_URLS = [
  "https://api.abcz.workers.dev",
  "https://api.api-store.workers.dev",
];

async function fetchData(path) {
  for (const baseUrl of API_URLS) {
    try {
      const response = await fetch(baseUrl + path);
      if (response.ok) {
        return await response.json();
      }
    } catch (error) {}
  }
  throw new Error("Could not load data from the API");
}

function toNumber(value) {
  const match = String(value).match(/[\d.]+/);
  return match ? Number(match[0]) : 0;
}

function toTextList(value) {
  if (Array.isArray(value)) {
    return value.map((item) => {
      if (typeof item === "string") return item;
      return item.name || item.text || item.step || item.description || "";
    });
  }
  if (typeof value === "string") {
    return value.split(/\n|,/).map((item) => item.trim()).filter(Boolean);
  }
  return [];
}

export function formatWorkout(item) {
  const equipment = item.equipment || "Bodyweight";

  return {
    id: String(item.id || item._id),
    name: item.name || item.title,
    image: item.image || item.imageUrl || item.thumbnail || "",
    categories: toTextList(item.muscleGroups || item.categories || item.category || item.tags),
    equipment: Array.isArray(equipment) ? equipment.join(", ") : equipment,
    difficulty: item.difficulty || item.level || "-",
    sets: item.sets || "-",
    reps: item.reps || "-",
    duration: toNumber(item.duration),
    calories: toNumber(item.caloriesBurned || item.calories),
    rating: toNumber(item.rating),
    description: item.description || "",
    instructions: toTextList(item.instructions || item.steps),
  };
}

export async function getWorkouts() {
  const json = await fetchData("/api/fitlog");
  const list = Array.isArray(json) ? json : json.data || json.workouts || [];
  return list.map(formatWorkout);
}

export async function getWorkout(id) {
  try {
    const json = await fetchData("/api/fitlog/" + id);
    let item = json.data || json.workout || json;
    if (Array.isArray(item)) item = item[0];
    if (item && (item.id || item._id)) {
      return formatWorkout(item);
    }
  } catch (error) {}

  const allWorkouts = await getWorkouts();
  return allWorkouts.find((workout) => workout.id === String(id)) || null;
}

export function formatMinutes(minutes) {
  return minutes + " min";
}

export function formatKcal(kcal) {
  return kcal + " kcal";
}
