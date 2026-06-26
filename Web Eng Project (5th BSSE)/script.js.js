/* ================================================
   HopeForward NGO — Main Script
   ================================================ */


/* ── ADMIN PANEL ────────────────────────────────────────────────── */

var ADMIN_PASSWORD = 'hopeforward2026';
var adminLoggedIn  = false;

function openAdmin() {
  document.getElementById('admin-overlay').classList.add('show');
  document.getElementById('admin-pass').value = '';
  document.getElementById('admin-login-err').textContent = '';
  if (adminLoggedIn) {
    showAdminPanel();
  } else {
    document.getElementById('admin-login-screen').style.display = 'block';
    document.getElementById('admin-panel-screen').style.display = 'none';
  }
}

function closeAdmin() {
  document.getElementById('admin-overlay').classList.remove('show');
}

// Close overlay when clicking outside the box
document.getElementById('admin-overlay').addEventListener('click', function(e) {
  if (e.target === this) closeAdmin();
});

function adminLogin() {
  var entered = document.getElementById('admin-pass').value;
  if (entered === ADMIN_PASSWORD) {
    adminLoggedIn = true;
    document.getElementById('admin-login-err').textContent = '';
    showAdminPanel();
  } else {
    document.getElementById('admin-login-err').textContent = '❌ Wrong password. Please try again.';
  }
}

function adminLogout() {
  adminLoggedIn = false;
  document.getElementById('admin-panel-screen').style.display = 'none';
  document.getElementById('admin-login-screen').style.display = 'block';
  document.getElementById('admin-pass').value = '';
}

function showAdminPanel() {
  document.getElementById('admin-login-screen').style.display = 'none';
  document.getElementById('admin-panel-screen').style.display = 'block';

  // Load current values into admin fields
  document.getElementById('adm-hero-h').value = document.getElementById('hero-heading').textContent.trim();
  document.getElementById('adm-hero-p').value = document.getElementById('hero-subtext').textContent.trim();

  document.getElementById('adm-about-1').value = document.getElementById('about-p1').textContent.trim();
  document.getElementById('adm-about-2').value = document.getElementById('about-p2').textContent.trim();

  document.getElementById('adm-address').value = document.getElementById('ci-address').textContent.trim();
  document.getElementById('adm-phone').value   = document.getElementById('ci-phone').textContent.trim();
  document.getElementById('adm-cemail').value  = document.getElementById('ci-email').textContent.trim();
  document.getElementById('adm-hours').value   = document.getElementById('ci-hours').textContent.trim();

  loadProgramsIntoAdmin();
}

function loadProgramsIntoAdmin() {
  var container = document.getElementById('programs-container');
  var items     = container.querySelectorAll('.program-item');
  var adminList = document.getElementById('adm-programs-list');
  adminList.innerHTML = '';

  items.forEach(function(item, i) {
    var title = item.querySelector('h3').textContent.trim();
    var desc  = item.querySelector('p').textContent.trim();

    var div = document.createElement('div');
    div.className = 'program-admin-item';
    div.innerHTML =
      '<label>Program ' + (i + 1) + ' — Title</label>' +
      '<input type="text" id="prog-title-' + i + '" value="' + escapeAttr(title) + '" />' +
      '<label>Description</label>' +
      '<textarea id="prog-desc-' + i + '">' + escapeHtml(desc) + '</textarea>';
    adminList.appendChild(div);
  });
}

function escapeAttr(str) {
  return str.replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function saveHero() {
  document.getElementById('hero-heading').textContent = document.getElementById('adm-hero-h').value;
  document.getElementById('hero-subtext').textContent = document.getElementById('adm-hero-p').value;
  showOk('hero-ok');
}

function saveAbout() {
  document.getElementById('about-p1').textContent = document.getElementById('adm-about-1').value;
  document.getElementById('about-p2').textContent = document.getElementById('adm-about-2').value;
  showOk('about-ok');
}

function savePrograms() {
  var container = document.getElementById('programs-container');
  var items     = container.querySelectorAll('.program-item');

  items.forEach(function(item, i) {
    var newTitle = document.getElementById('prog-title-' + i);
    var newDesc  = document.getElementById('prog-desc-' + i);
    if (newTitle && newDesc) {
      item.querySelector('h3').textContent = newTitle.value;
      item.querySelector('p').textContent  = newDesc.value;
    }
  });
  showOk('programs-ok');
}

function saveContact() {
  document.getElementById('ci-address').textContent = document.getElementById('adm-address').value;
  document.getElementById('ci-phone').textContent   = document.getElementById('adm-phone').value;
  document.getElementById('ci-email').textContent   = document.getElementById('adm-cemail').value;
  document.getElementById('ci-hours').textContent   = document.getElementById('adm-hours').value;
  showOk('contact-info-ok');
}

function showOk(id) {
  var el = document.getElementById(id);
  el.textContent = '✅ Saved successfully!';
  setTimeout(function() { el.textContent = ''; }, 3000);
}


/* ── DONATION ───────────────────────────────────────────────────── */

function selectAmount(btn, amount) {
  document.querySelectorAll('.amount-btn').forEach(function(b) {
    b.classList.remove('selected');
  });
  btn.classList.add('selected');
  document.getElementById('donor-amount').value = amount;
}

function submitDonation() {
  var name   = document.getElementById('donor-name').value.trim();
  var email  = document.getElementById('donor-email').value.trim();
  var amount = document.getElementById('donor-amount').value.trim();
  var msg    = document.getElementById('donate-msg');

  if (!name || !email || !amount) {
    msg.style.color = 'red';
    msg.textContent = 'Please fill in all fields before donating.';
    return;
  }
  if (isNaN(amount) || Number(amount) <= 0) {
    msg.style.color = 'red';
    msg.textContent = 'Please enter a valid donation amount.';
    return;
  }

  msg.style.color = '#2e7d32';
  msg.textContent = 'Thank you, ' + name + '! Your donation of Rs ' + amount + ' has been received. 💚';

  document.getElementById('donor-name').value   = '';
  document.getElementById('donor-email').value  = '';
  document.getElementById('donor-amount').value = '';
  document.querySelectorAll('.amount-btn').forEach(function(b) {
    b.classList.remove('selected');
  });
}


/* ── CONTACT FORM ───────────────────────────────────────────────── */

function submitContact() {
  var name    = document.getElementById('c-name').value.trim();
  var email   = document.getElementById('c-email').value.trim();
  var subject = document.getElementById('c-subject').value.trim();
  var message = document.getElementById('c-message').value.trim();
  var msg     = document.getElementById('contact-msg');

  if (!name || !email || !subject || !message) {
    msg.style.color = 'red';
    msg.textContent = 'Please fill in all fields.';
    return;
  }

  msg.style.color = '#2e7d32';
  msg.textContent = 'Thank you, ' + name + '! We will get back to you soon. ✅';

  document.getElementById('c-name').value    = '';
  document.getElementById('c-email').value   = '';
  document.getElementById('c-subject').value = '';
  document.getElementById('c-message').value = '';
}


/* ── SMOOTH SCROLL ──────────────────────────────────────────────── */

document.querySelectorAll('nav ul li a').forEach(function(link) {
  link.addEventListener('click', function(e) {
    var href = this.getAttribute('href');
    if (href.startsWith('#')) {
      e.preventDefault();
      var target = document.querySelector(href);
      if (target) {
        window.scrollTo({ top: target.offsetTop - 60, behavior: 'smooth' });
      }
    }
  });
});
