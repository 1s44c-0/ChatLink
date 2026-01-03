const countries = [
    {name:"Afghanistan",code:"+93",flag:"🇦🇫"},
    {name:"Albania",code:"+355",flag:"🇦🇱"},
    {name:"Algeria",code:"+213",flag:"🇩🇿"},
    {name:"Argentina",code:"+54",flag:"🇦🇷"},
    {name:"Australia",code:"+61",flag:"🇦🇺"},
    {name:"Brazil",code:"+55",flag:"🇧🇷"},
    {name:"Canada",code:"+1",flag:"🇨🇦"},
    {name:"China",code:"+86",flag:"🇨🇳"},
    {name:"France",code:"+33",flag:"🇫🇷"},
    {name:"Germany",code:"+49",flag:"🇩🇪"},
    {name:"Ghana",code:"+233",flag:"🇬🇭"},
    {name:"India",code:"+91",flag:"🇮🇳"},
    {name:"Italy",code:"+39",flag:"🇮🇹"},
    {name:"Japan",code:"+81",flag:"🇯🇵"},
    {name:"Kenya",code:"+254",flag:"🇰🇪"},
    {name:"Nigeria",code:"+234",flag:"🇳🇬"},
    {name:"South Africa",code:"+27",flag:"🇿🇦"},
    {name:"United Kingdom",code:"+44",flag:"🇬🇧"},
    {name:"United States",code:"+1",flag:"🇺🇸"}
  ];
  
  let selectedCode = "+234";
  let lastLink = "";
  
  const btn = document.getElementById("countryBtn");
  const dropdown = document.getElementById("countryDropdown");
  const list = document.getElementById("countryList");
  const search = document.getElementById("searchCountry");
  
  btn.onclick = () => dropdown.style.display =
    dropdown.style.display === "block" ? "none" : "block";
  
  function loadCountries(arr) {
    list.innerHTML = "";
    arr.forEach(c => {
      const li = document.createElement("li");
      li.textContent = `${c.flag} ${c.name} (${c.code})`;
      li.onclick = () => {
        selectedCode = c.code;
        btn.textContent = `${c.flag} ${c.code}`;
        dropdown.style.display = "none";
      };
      list.appendChild(li);
    });
  }
  loadCountries(countries);
  
  search.onkeyup = () => {
    loadCountries(countries.filter(c =>
      c.name.toLowerCase().includes(search.value.toLowerCase())
    ));
  };
  
  function generateLink() {
    let phone = document.getElementById("phone").value.trim();
    const msg = encodeURIComponent(document.getElementById("message").value);
  
    if (phone.startsWith("0")) phone = phone.substring(1);
    const full = selectedCode.replace("+","") + phone;
  
    lastLink = `https://wa.me/${full}${msg ? "?text=" + msg : ""}`;
  
    document.getElementById("result").innerHTML =
      `<a href="${lastLink}" target="_blank">${lastLink}</a>`;
  }
  
  function copyLink() {
    if (!lastLink) return alert("Generate a link first");
    navigator.clipboard.writeText(lastLink);
    alert("Link copied!");
  }
  
  function generateQR() {
    if (!lastLink) return alert("Generate a link first");
    document.getElementById("qr").innerHTML =
      `<img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(lastLink)}">`;
  }
  