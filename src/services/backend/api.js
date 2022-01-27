const url = "192.168.0.50:5000";

export async function doMission() {
  const report = await fetch(`${url}/cotrie/do_mission`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({}),
  });
}
