// Hotel Alexandria — shared site behavior (no build step, no framework)

function toggleDrawer() {
  var panel = document.getElementById('booking-drawer');
  if (panel) { panel.classList.toggle('open'); }
}

function selectHotspot(id) {
  var panels = document.querySelectorAll('.hotspot-panel');
  for (var i = 0; i < panels.length; i++) { panels[i].style.display = 'none'; }
  var placeholder = document.getElementById('hotspot-placeholder');
  if (placeholder) { placeholder.style.display = 'none'; }
  var target = document.getElementById('hotspot-' + id);
  if (target) { target.style.display = 'block'; }
}

function updateJourneySlider(val) {
  var futureImg = document.getElementById('future-img');
  var divider = document.getElementById('journey-divider');
  if (futureImg) { futureImg.style.clipPath = 'inset(0 ' + (100 - val) + '% 0 0)'; }
  if (divider) { divider.style.left = val + '%'; }
}
