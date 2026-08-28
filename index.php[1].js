<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>University Portal</title>

    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: Arial, sans-serif;
        }

        body {
            background: #f4f6f9;
            min-height: 100vh;
        }

        header {
            background: #1e3a8a;
            color: white;
            padding: 20px;
            text-align: center;
        }

        header h1 {
            margin-bottom: 5px;
        }

        .container {
            width: 90%;
            max-width: 900px;
            margin: 30px auto;
        }

        .card {
            background: white;
            padding: 25px;
            margin-bottom: 20px;
            border-radius: 12px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
        }

        .card h2 {
            margin-bottom: 20px;
            color: #1e3a8a;
        }

        input {
            width: 100%;
            padding: 13px;
            border: 1px solid #ccc;
            border-radius: 8px;
            margin-bottom: 12px;
            font-size: 16px;
        }

        button {
            padding: 12px 20px;
            background: #1e3a8a;
            color: white;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-size: 16px;
        }

        button:hover {
            background: #172d6b;
        }

        #itemsList {
            margin-top: 10px;
        }

        .item {
            background: #f8fafc;
            padding: 15px;
            border-radius: 8px;
            margin-bottom: 10px;
            border-left: 4px solid #1e3a8a;
        }

        .item strong {
            font-size: 18px;
        }

        .item small {
            display: block;
            color: #666;
            margin-top: 5px;
        }

        .empty {
            color: #777;
            text-align: center;
            padding: 20px;
        }
    </style>
</head>

<body>

<header>
    <h1>University Portal</h1>
    <p>Student Management System</p>
</header>

<div class="container">

    <!-- Add Item -->
    <div class="card">

        <h2>Add Item</h2>

        <input
            type="text"
            id="itemName"
            placeholder="Enter item name"
        >

        <button onclick="addItem()">
            Add Item
        </button>

    </div>

    <!-- All Items -->
    <div class="card">

        <h2>All Items</h2>

        <div id="itemsList"></div>

    </div>

</div>

<script>

    // --------------------------------------
    // Get saved items
    // --------------------------------------

    let items = JSON.parse(
        localStorage.getItem("universityItems")
    ) || [];


    // --------------------------------------
    // Add Item
    // --------------------------------------

    function addItem() {

        const nameInput = document.getElementById("itemName");

        const name = nameInput.value.trim();

        if (name === "") {
            alert("Please enter item name");
            return;
        }

        const item = {

            id: Date.now(),

            name: name,

            createdAt: new Date().toISOString()

        };

        items.push(item);

        localStorage.setItem(
            "universityItems",
            JSON.stringify(items)
        );

        nameInput.value = "";

        displayItems();

    }


    // --------------------------------------
    // Display all items
    // --------------------------------------

    function displayItems() {

        const itemsList =
            document.getElementById("itemsList");

        if (items.length === 0) {

            itemsList.innerHTML =
                '<div class="empty">No items found</div>';

            return;

        }

        itemsList.innerHTML = "";

        items.forEach(item => {

            const div = document.createElement("div");

            div.className = "item";

            const date =
                new Date(item.createdAt).toLocaleString();

            div.innerHTML = `
                <strong>${escapeHTML(item.name)}</strong>
                <small>Created: ${date}</small>
            `;

            itemsList.appendChild(div);

        });

    }


    // --------------------------------------
    // Security helper
    // --------------------------------------

    function escapeHTML(text) {

        const div = document.createElement("div");

        div.textContent = text;

        return div.innerHTML;

    }


    // --------------------------------------
    // Load items when page opens
    // --------------------------------------

    displayItems();

</script>

</body>
</html>
