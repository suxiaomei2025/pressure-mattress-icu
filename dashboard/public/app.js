(function () {
  'use strict';

  function byId(id) { return document.getElementById(id); }

  function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function riskClass(s) {
    if (s >= 70) return 'high';
    if (s >= 40) return 'medium';
    return 'low';
  }

  function setConn(ok, text) {
    var el = byId('conn-status');
    el.textContent = text;
    el.className = 'badge ' + (ok ? 'badge-ok' : 'badge-error');
  }

  function getJSON(path) {
    return fetch(path, { headers: { Accept: 'application/json' } }).then(function (r) {
      if (!r.ok) throw new Error(path + ' -> ' + r.status);
      return r.json();
    });
  }

  function refresh() {
    getJSON('/health').then(function (h) {
      setConn(true, 'API: ' + h.status);
      byId('api-status').textContent = h.status || 'ok';
    }).catch(function () {
      setConn(false, 'offline');
      byId('api-status').textContent = 'unreachable';
    });

    getJSON('/api/v1/patients').then(function (data) {
      var patients = data.patients || [];
      byId('patient-count').textContent = patients.length;
      byId('high-risk-count').textContent = patients.filter(function (p) {
        return p.risk_score >= 70;
      }).length;

      var rows = byId('patient-rows');
      if (!patients.length) {
        rows.innerHTML = '<tr><td colspan="4">No patients</td></tr>';
        return;
      }
      rows.innerHTML = patients.map(function (p) {
        return '<tr>' +
          '<td>' + esc(p.mrn) + '</td>' +
          '<td>' + esc(p.full_name) + '</td>' +
          '<td>' + esc(p.bed_name || '') + '</td>' +
          '<td><span class="risk risk-' + riskClass(p.risk_score) + '">' + p.risk_score + '</span></td>' +
          '</tr>';
      }).join('');
    }).catch(function () {
      byId('patient-rows').innerHTML = '<tr><td colspan="4">Unable to load patients</td></tr>';
    });
  }

  refresh();
  setInterval(refresh, 10000);
})();
