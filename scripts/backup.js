function exportBackup() {
  const data = {
    rooms: JSON.parse(localStorage.getItem('rooms') || '[]'),
    reservations: JSON.parse(localStorage.getItem('reservations') || '[]')
  };
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "backup_paroquia.json";
  a.click();
}

function importBackup(file) {
  const reader = new FileReader();
  reader.onload = (e) => {
    const data = JSON.parse(e.target.result);
    localStorage.setItem('rooms', JSON.stringify(data.rooms));
    localStorage.setItem('reservations', JSON.stringify(data.reservations));
    alert('Backup restaurado com sucesso!');
    location.reload();
  };
  reader.readAsText(file);
}
