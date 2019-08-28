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
    "results": ["Flu"]
};

export const completePositiveMultiple= {
    "barcode": "34567890",
    "status": "complete",
    "results": ["Flu", "RSV"]
};

export const completeSequenced = {
    "barcode": "34567890",
    "status": "completeSequenced",
    "results": ["Flu", "RSV"]
}

export const wrongBarcode = {
    "barcode": null,
    "status": "unknownBarcode",
    "results": null
}
