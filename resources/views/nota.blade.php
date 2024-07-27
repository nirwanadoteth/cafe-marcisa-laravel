<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <style>
        body {
            font-family: 'figtree', sans-serif;
            font-size: 0.875rem;
        }

        .font-medium {
            font-weight: 500;
        }

        .text-center {
            text-align: center;
        }

        .text-right {
            text-align: right;
        }

        .w-full {
            width: 100%;
        }
    </style>
</head>

<body class="items-center">
    <table class="w-full">
        <thead>
            <tr>
                <th colspan="2" class="text-center">MARCISA</th>
            </tr>
            <tr>
                <td colspan="2" class="text-center"><br /></td>
            </tr>
            <tr>
                <td>{{ \Carbon\Carbon::parse($pesanan->nota->Tanggal)->format('d M Y') }}</td>
                <td class="text-right">{{ \Carbon\Carbon::parse($pesanan->nota->Tanggal)->format('H:i:s') }}</td>
            </tr>
            <tr>
                <td>Receipt ID</td>
                <td class="text-right">{{ $pesanan->nota->Id_Nota }}</td>
            </tr>
            <tr>
                <td>Cashier</td>
                <td class="text-right">{{ $pesanan->user->Username }}</td>
            </tr>
            <tr>
                <td>Customer</td>
                <td class="text-right">{{ $pesanan->pembeli->Nama }}</td>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td colspan="2">
                    <hr />
                </td>
            </tr>
            @foreach ($pesanan->rincian_pesanan as $rincian)
                <tr>
                    <td colspan="2">{{ $rincian->produk->Nama }}</td>
                </tr>
                <tr>
                    <td colspan="1">{{ $rincian->Jumlah }} x {{ number_format($rincian->produk->Harga) }}</td>
                    <td class="text-right" colspan="1">{{ number_format($rincian->Jumlah * $rincian->produk->Harga) }}</td>
                </tr>
            @endforeach
            <tr>
                <td colspan="2">
                    <hr />
                </td>
            </tr>
            <tr>
                <td colspan="1">Subtotal</td>
                <td class="text-right" colspan="1">{{ number_format($pesanan->nota->Sub_Total) }}</td>
            </tr>
            <tr>
                <td colspan="1">Tax (10%)</td>
                <td class="text-right" colspan="1">{{ number_format($pesanan->nota->Pajak) }}</td>
            </tr>
            <tr>
                <td colspan="1">Total</td>
                <td class="text-right" colspan="1">{{ number_format($pesanan->nota->Total_Harga) }}</td>
            </tr>
            <tr>
                <td colspan="1">Cash</td>
                <td class="text-right" colspan="1">{{ number_format($pesanan->nota->Diterima) }}</td>
            </tr>
            <tr>
                <td colspan="1">Change</td>
                <td class="text-right" colspan="1">{{ number_format($pesanan->nota->Kembali) }}</td>
            </tr>
        </tbody>
        <tfoot>
            <tr>
                <td colspan="2"><br /></td>
            </tr>
            <tr>
                <td colspan="2" class="font-medium text-center">*** THANK YOU ***</td>
            </tr>
        </tfoot>
    </table>
</body>

</html>