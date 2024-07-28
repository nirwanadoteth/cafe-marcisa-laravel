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

        .font-semibold {
            font-weight: 600;
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

        .border {
            border-width: 1px;
        }

        .border-collapse {
            border-collapse: collapse;
        }

        .margin-2 {
            margin: 2px;
        }

        th,
        td {
            padding: 5px;
        }
        p-2 {
            padding: 2px;
        }
    </style>
</head>

<body class="items-center">
    <p class="text-center font-medium">LAPORAN PEMASUKAN</p>
    <p class="text-center font-medium">CAFE MARCISA</p>
    <p class="text-center font-medium"> {{ $selectedLabel }} </p>
    <table class="w-full border-collapse" border="1">
        <thead>
            <tr>
                <td class="font-medium">
                    No
                </td>
                <td class="font-medium">
                    Nama Pembeli
                </td>
                <td class="font-medium">
                    Total
                </td>
                <td class="font-medium">
                    Diterima
                </td>
                <td class="font-medium">
                    Kembali
                </td>
            </tr>
        </thead>
        <tbody>
            @foreach ($nota as $rincian)
                <tr>
                    <td>{{ $loop->iteration }}</td>
                    <td>{{ $rincian->pesanan->pembeli->Nama }}</td>
                    <td>{{ number_format($rincian->Total_Harga) }}</td>
                    <td>{{ number_format($rincian->Diterima) }}</td>
                    <td>{{ number_format($rincian->Kembali) }}</td>
                </tr>
            @endforeach
        </tbody>
        <tfoot>
            <tr>
                <td colspan="2" class="font-semibold">TOTAL</td>
                <td class="font-medium" colspan="3">{{ number_format($nota->sum('Total_Harga')) }}</td>
            </tr>
    </table>
    <script>
        console.log($data);
    </script>
</body>

</html>