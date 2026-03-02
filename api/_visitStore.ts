// api/_visitStore.ts — счётчик визитов в памяти (без БД)
// На Vercel каждый инстанс сервера свой — число приблизительное, может обнуляться при холодном старте.

let state: { date: string; count: number } = { date: "", count: 0 };

function todayKey(): string {
  return new Date().toISOString().slice(0, 10);
}

export function getTodayCount(): number {
  const today = todayKey();
  if (state.date !== today) return 0;
  return state.count;
}

export function incrementToday(): number {
  const today = todayKey();
  if (state.date !== today) {
    state = { date: today, count: 0 };
  }
  state.count += 1;
  return state.count;
}
