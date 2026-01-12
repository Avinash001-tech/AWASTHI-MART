const container = document.getElementById("products");

// ===== LOAD PRODUCTS =====
async function loadProducts(){
  try{
    const res = await fetch("http://localhost:5000/api/products");
    const data = await res.json();
    container.innerHTML="";
    data.forEach(p=>{
      container.innerHTML += `
        <div class="card">
          <img src="http://localhost:5000${p.image}" />
          <h4>${p.title}</h4>
          <b>₹${p.price}</b><br>
          <a href="https://wa.me/918840125802">Buy on WhatsApp</a>
        </div>
      `;
    });
  }catch(err){
    console.log("Error loading products", err);
  }
}

loadProducts();

// ===== ADMIN LOGIN & REDIRECT =====
function openAdmin(){
  const username = prompt("Enter Admin Username:");
  const password = prompt("Enter Admin Password:");

  fetch("http://localhost:5000/api/admin/login",{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({username,password})
  })
  .then(res=>{
    if(!res.ok) throw new Error("Wrong Credentials");
    return res.json();
  })
  .then(data=>{
    if(data.success){
      window.location.href = "admin.html"; // Redirect to admin dashboard
    }
  })
  .catch(err=>{
    alert(err.message);
  });
}
