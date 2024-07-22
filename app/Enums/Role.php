<?php

namespace App\Enums;

enum Role: string
{
    // case ADMIN = 'Admin';
    // case USER = 'User';
    case OWNER = 'Owner';
    case CASHIER = 'Kasir';
    case MKP = 'MKP';
}
