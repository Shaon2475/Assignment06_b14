                                                                   FitLog - Workout Library

FitLog is a dark, no-nonsense gym companion built with Next.js. Browse a library of lifts,
open any workout to see its details, lock your picks into today's plan, 
and watch your minutes and calories add up on the My Plan dashboard.

                                              Technologies Used
Technology	Why it is used
Next.js        (App Router) Pages, routing, dynamic route /workouts/[id]
React   	Components, useState, useEffect
Tailwind CSS	Styling and responsive layout
Context API	Sharing Plan, Saved and Done lists across the whole app
Google Fonts	Oswald (headings) and Inter (body text)
localStorage	Keeping the plan and saved list after a page reload

                                                Features
                                                
Workout Library - All workouts are fetched from the FitLog API and shown as cards with image, muscle tags, equipment, duration, calories and rating.
Workout Details Page - A dynamic route (/workouts/[id]) shows a large image, a key specs table and step-by-step instructions.
Today's Plan (max 5 lifts) - Add a workout to today's plan from the details page. The button is disabled once the plan has 5 lifts.
Save for Later - Save workouts to a separate Saved list and view them anytime.
Live Navbar Badges - The Plan and Saved counters in the navbar update instantly when you add or remove a workout.
My Plan Dashboard - Shows live totals for Exercises, Minutes and Calories, with tabs to switch between Today's Plan and Saved.
Sort Options - Sort the list by Duration, Calories or Rating.
Mark as Done and Remove - Finish a lift with one click or remove it from the list.
Toast Messages - Clear feedback every time you add, save, finish or remove a workout.
Loading, Error and Empty States - A spinner while data loads, an error box with a retry button if the API fails, and a friendly empty state with a "Go to workouts" button.
Fully Responsive - Works on mobile, tablet and desktop (the card grid changes from 3 columns to 2 and 1).
