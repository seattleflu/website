export const notReceived = {
    "barcode": "12345678",
    "status": "notReceived",
    "results": []
};

export const processing = {
    "barcode": "23456789",
    "status": "processing",
    "results": []
};

export const completeNegative = {
    "barcode": "34567890",
    "status": "complete",
    "results": []
};

export const completePositiveFlu= {
    "barcode": "34567890",
    "status": "complete",
    "results": ["Influenza.A.H1N1"],
    "sequenced": false
};

export const completePositiveMultiple= {
    "barcode": "34567890",
    "status": "complete",
    "results": ["Influenza.A.H1N1", "RSV.A", "coronavirus", "enterovirus"],
    "sequenced": false
};

export const completeSequenced = {
    "barcode": "34567890",
    "status": "complete",
    "results": ["Influenza.A.H1N1", "RSV.A"],
    "sequenced": true
}

export const wrongBarcode = {
    "barcode": null,
    "status": "unknownBarcode",
    "results": null
}
