"use client";
import { createContext, useContext, useEffect, useState } from "react";

const PlanContext = createContext(null);

export const PLAN_LIMIT = 5;
const STORAGE_KEY = "fitlog:v1";

export function PlanProvider({ children }) {
  const [planIds, setPlanIds] = useState([]);
  const [savedIds, setSavedIds] = useState([]);
  const [doneIds, setDoneIds] = useState([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const data = JSON.parse(raw);
        setPlanIds(data.planIds ?? []);
        setSavedIds(data.savedIds ?? []);
        setDoneIds(data.doneIds ?? []);
      }
    } catch {}
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ planIds, savedIds, doneIds }));
    } catch {}
  }, [planIds, savedIds, doneIds, ready]);

  function addToPlan(id) {
    if (planIds.includes(id)) return "exists";
    if (planIds.length >= PLAN_LIMIT) return "full";
    setPlanIds([...planIds, id]);
    return "added";
  }

  function addToSaved(id) {
    if (savedIds.includes(id)) return "exists";
    setSavedIds([...savedIds, id]);
    return "added";
  }

  function removeFromPlan(id) {
    setPlanIds(planIds.filter((x) => x !== id));
    setDoneIds(doneIds.filter((x) => x !== id));
  }

  function removeFromSaved(id) {
    setSavedIds(savedIds.filter((x) => x !== id));
  }

  function markDone(id) {
    if (!doneIds.includes(id)) setDoneIds([...doneIds, id]);
  }

  const value = {
    planIds,
    savedIds,
    doneIds,
    ready,
    isPlanFull: planIds.length >= PLAN_LIMIT,
    addToPlan,
    addToSaved,
    removeFromPlan,
    removeFromSaved,
    markDone,
  };

  return <PlanContext.Provider value={value}>{children}</PlanContext.Provider>;
}

export function usePlan() {
  const ctx = useContext(PlanContext);
  if (!ctx) throw new Error("usePlan must be used inside <PlanProvider>");
  return ctx;
}
