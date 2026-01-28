const API = "http://localhost:5000/contacts";

async function loadContacts() {
  const res = await fetch(API);
  const contacts = await res.json();

  const list = document.getElementById("contactList");
  list.innerHTML = "";

  contacts.forEach(c => {
    const li = document.createElement("li");
    li.innerHTML = `${c.name} - ${c.phone}
      <button onclick="deleteContact(${c.id})">❌</button>`;
    list.appendChild(li);
  });
}

async function addContact() {
  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;

  await fetch(API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, phone })
  });

  loadContacts();
}

async function deleteContact(id) {
  await fetch(`${API}/${id}`, { method: "DELETE" });
  loadContacts();
}

loadContacts();
