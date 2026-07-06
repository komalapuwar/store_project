ydsugwudhjbdh
hsdbghvdhedhsbcuxh
<?php
// transactions.php
session_start();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Transactions</title>

    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 20px;
        }

        .container {
            width: 80%;
            margin: auto;
            background: white;
            padding: 20px;
            border-radius: 8px;
        }

        h2 {
            text-align: center;
            color: #333;
        }

        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
        }

        table, th, td {
            border: 1px solid #ccc;
        }

        th {
            background-color: #007BFF;
            color: white;
            padding: 10px;
        }

        td {
            padding: 10px;
            text-align: center;
        }
    </style>
</head>

<body>

<div class="container">
    <h2>Transaction History</h2>

    <table>
        <tr>
            <th>Transaction ID</th>
            <th>Customer</th>
            <th>Product</th>
            <th>Quantity</th>
            <th>Total Amount</th>
            <th>Date</th>
        </tr>

        <tr>
            <td>TR001</td>
            <td>John Doe</td>
            <td>Rice Bag</td>
            <td>2</td>
            <td>$40</td>
            <td>06-07-2026</td>
        </tr>

        <tr>
            <td>TR002</td>
            <td>Alice</td>
            <td>Sugar</td>
            <td>5</td>
            <td>$25</td>
            <td>06-07-2026</td>
        </tr>

    </table>
</div>

</body>
</html>