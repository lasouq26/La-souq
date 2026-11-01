import { useState } from "react";

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"] as const;
type Row = { day: typeof DAYS[number]; open: string; close: string; closed: boolean };
type Schedule = { timezone: string; weeklyHours: Row[] };
const empty = (): Schedule => ({ timezone: "America/Chicago", weeklyHours: DAYS.map(day => ({ day, open: "08:00", close: "22:00", closed: false })) });

export default function AdminHoursPage() {
  const [token, setToken] = useState(() => sessionStorage.getItem("la-souq-hours-token") || "");
  const [schedule, setSchedule] = useState<Schedule | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const headers = { "Content-Type": "application/json", "x-admin-hours-token": token };
  const load = async () => {
    setLoading(true); setError(null); setMessage(null);
    try {
      const response = await fetch("/api/admin/hours", { headers });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Unable to verify owner access.");
      sessionStorage.setItem("la-souq-hours-token", token); setSchedule(data);
    } catch (err) { setError(err instanceof Error ? err.message : "Unable to verify owner access."); }
    finally { setLoading(false); }
  };
  const update = (index: number, field: keyof Row, value: string | boolean) => {
    if (!schedule) return;
    const weeklyHours = schedule.weeklyHours.map((item, current) => current === index ? { ...item, [field]: value, ...(field === "closed" && value ? { open: "", close: "" } : {}) } : item);
    setSchedule({ ...schedule, weeklyHours }); setMessage(null);
  };
  const save = async () => {
    if (!schedule) return;
    for (const row of schedule.weeklyHours) if (!row.closed && (!/^([01][0-9]|2[0-3]):[0-5][0-9]$/.test(row.open) || !/^([01][0-9]|2[0-3]):[0-5][0-9]$/.test(row.close) || row.open >= row.close)) { setError(`${row.day}: enter valid times with closing after opening.`); return; }
    setSaving(true); setError(null); setMessage(null);
    try {
      const response = await fetch("/api/admin/hours", { method: "PUT", headers, body: JSON.stringify(schedule) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Unable to save changes.");
      setSchedule(data); setMessage("Operating hours saved.");
    } catch (err) { setError(err instanceof Error ? err.message : "Unable to save changes."); }
    finally { setSaving(false); }
  };
  const signOut = () => { sessionStorage.removeItem("la-souq-hours-token"); setToken(""); setSchedule(null); setMessage(null); setError(null); };
  return <main className="min-h-screen bg-[#eee3d9] px-5 py-12 text-[#231f14]"><div className="mx-auto max-w-3xl rounded-[2rem] border border-[#b69b79]/30 bg-[#fdfaf7] p-6 shadow-xl md:p-10"><div className="mb-8"><p className="mb-2 text-[10px] font-bold uppercase tracking-[.3em] text-[#9da18a]">Owner area</p><h1 className="font-serif text-4xl font-bold">Operating hours</h1><p className="mt-2 text-sm text-[#231f14]/65">Set the regular weekly schedule for the storefront. Times use Central Time.</p></div>{!schedule ? <div className="max-w-md space-y-4"><label className="block text-sm font-bold" htmlFor="owner-token">Owner access code<input id="owner-token" type="password" autoComplete="current-password" value={token} onChange={event => setToken(event.target.value)} className="mt-2 w-full rounded-xl border border-[#231f14]/20 bg-white px-4 py-3" /></label><button type="button" onClick={load} disabled={!token || loading} className="rounded-full bg-[#231f14] px-6 py-3 text-xs font-bold uppercase tracking-wider text-white disabled:opacity-50">{loading ? "Checking access…" : "Continue"}</button>{error && <p role="alert" className="text-sm text-red-700">{error}</p>}</div> : <><div className="space-y-3">{schedule.weeklyHours.map((row, index) => <div key={row.day} className="grid grid-cols-1 gap-3 rounded-2xl border border-[#231f14]/10 bg-white/70 p-4 sm:grid-cols-[1fr_130px_130px_auto] sm:items-center"><span className="font-serif text-xl font-bold">{row.day}</span><label className="text-xs font-bold uppercase tracking-wide">Open<input aria-label={`${row.day} open time`} type="time" disabled={row.closed} value={row.open} onChange={event => update(index, "open", event.target.value)} className="mt-1 block w-full rounded-lg border border-[#231f14]/20 px-2 py-2 disabled:bg-[#eee3d9]" /></label><label className="text-xs font-bold uppercase tracking-wide">Close<input aria-label={`${row.day} close time`} type="time" disabled={row.closed} value={row.close} onChange={event => update(index, "close", event.target.value)} className="mt-1 block w-full rounded-lg border border-[#231f14]/20 px-2 py-2 disabled:bg-[#eee3d9]" /></label><label className="flex items-center gap-2 text-sm font-bold"><input type="checkbox" checked={row.closed} onChange={event => update(index, "closed", event.target.checked)} /> Closed</label></div>)}</div>{error && <p role="alert" className="mt-5 text-sm text-red-700">{error}</p>}{message && <p role="status" className="mt-5 text-sm font-bold text-green-800">{message}</p>}<div className="mt-7 flex items-center gap-4"><button type="button" onClick={save} disabled={saving} className="rounded-full bg-[#231f14] px-6 py-3 text-xs font-bold uppercase tracking-wider text-white disabled:opacity-50">{saving ? "Saving…" : "Save Changes"}</button><button type="button" onClick={signOut} className="text-xs font-bold uppercase tracking-wider underline">Sign out</button></div></>}</div></main>;
}