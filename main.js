
let itemArr = []; // เก็บรายการสินค้า
let deletedItems = []; // เก็บสินค้าที่ถูกลบ
let selectedItems = new Set(); // ใช้ Set เก็บ ID ของสินค้าที่ถูกเลือก

// ฟังก์ชันสำหรับแสดงรายการสินค้าและประวัติการลบ
function render() {
  let appHtmlText = '';
  itemArr.forEach((item) => {
    appHtmlText += `
      <div class="item" id="${item.id}">
        <input type="checkbox" onchange="toggleSelect(${item.id})" />
        <div>${item.text} - ${item.price.toFixed(2)} บาท</div>
        ${item.img ? `<img src="${item.img}" alt="Item Image" />` : ''}
        <button class="Remove" onclick="removeItem(${item.id})">Remove</button>
      </div>`;
  });
  document.getElementById("app").innerHTML = appHtmlText;

  let historyHtmlText = '';
  deletedItems.forEach((item) => {
    historyHtmlText += `
      <div class="item">
        <div>${item.text} - ${item.price.toFixed(2)} บาท</div>
        ${item.img ? `<img src="${item.img}" alt="Deleted Image" />` : ''}
      </div>`;
  });
  document.getElementById("history").innerHTML = historyHtmlText;

  updateTotalPrice();
}

// ฟังก์ชันเพิ่มสินค้าใหม่
function addItem() {
  const inputText = document.getElementById("input-txt").value;
  const inputPrice = parseFloat(document.getElementById("input-price").value);
  const inputImg = document.getElementById("input-img").value;

  if (inputText.trim() === "") return alert("โปรดเพิ่มรายการสินค้า");
  if (isNaN(inputPrice) || inputPrice < 0) return alert("โปรดใส่ราคาสินค้าที่ถูกต้อง");

  const id = Date.now();
  itemArr.push({ id, text: inputText, price: inputPrice, img: inputImg.trim() || null });

  // ล้างค่าช่องอินพุตหลังจากเพิ่มสินค้า
  document.getElementById("input-txt").value = "";
  document.getElementById("input-price").value = "";
  document.getElementById("input-img").value = "";

  render();
}

// ฟังก์ชันลบสินค้า
function removeItem(id) {
  const itemToRemove = itemArr.find((item) => item.id === id);
  if (itemToRemove) {
    deletedItems.push(itemToRemove);
    itemArr = itemArr.filter((item) => item.id !== id);
    render();
  }
}

// ฟังก์ชันเลือกหรือยกเลิกการเลือกสินค้า
function toggleSelect(id) {
  if (selectedItems.has(id)) {
    selectedItems.delete(id); // ยกเลิกการเลือก
  } else {
    selectedItems.add(id); // เลือกสินค้า
  }
}

// ฟังก์ชันลบสินค้าที่ถูกเลือก
function removeSelectedItems() {
  itemArr = itemArr.filter((item) => {
    if (selectedItems.has(item.id)) {
      deletedItems.push(item);
      return false; // ลบออกจากรายการ
    }
    return true;
  });
  selectedItems.clear(); // ล้างการเลือก
  render();
}

// ฟังก์ชันอัปเดตราคารวมของสินค้า
function updateTotalPrice() {
  const total = itemArr.reduce((sum, item) => sum + item.price, 0);
  document.getElementById("total-price").textContent = `Total: $${total.toFixed(2)}`;
}
