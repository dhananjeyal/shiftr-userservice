module.exports = {
    "swagger": "2.0",
    "info": {
        "version": "1.0",
        "title": "FORD-PRICING",
        "description": "TODO: Add Description",
        "contact": {}
    },
    "host": "15.206.144.248:3000",
    "basePath": "/api/v1",
    "schemes": [
        "http"
    ],
    "consumes": [
        "application/json"
    ],
    "produces": [
        "application/json"
    ],
    "paths": {
        "/pricing/type": {
            "get": {
                "description": "",
                "summary": "Get All",
                "tags": [
                    "PRICING TYPES"
                ],
                "operationId": "GetAll",
                "deprecated": false,
                "produces": [
                    "application/json"
                ],
                "parameters": [],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                }
            },
            "post": {
                "description": "",
                "summary": "Add",
                "tags": [
                    "PRICING TYPES"
                ],
                "operationId": "Add",
                "deprecated": false,
                "produces": [
                    "application/json"
                ],
                "parameters": [
                    {
                        "name": "Body",
                        "in": "body",
                        "required": true,
                        "description": "",
                        "schema": {
                            "$ref": "#/definitions/AddRequest"
                        }
                    },
                    {
                        "name": "Content-Type",
                        "in": "header",
                        "required": true,
                        "type": "string",
                        "description": "",
                        "default": "application/json",
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                }
            }
        },
        "/pricing/type/{typeId}": {
            "get": {
                "description": "",
                "summary": "Get by id",
                "tags": [
                    "PRICING TYPES"
                ],
                "operationId": "Getbyid",
                "deprecated": false,
                "produces": [
                    "application/json"
                ],
                "parameters": [{
                    "name": "typeId",
                    "in": "path",
                    "required": true,
                    "type": "integer",
                    "format": "int32",
                    "description": ""
                }],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                }
            },
            "put": {
                "description": "",
                "summary": "Update",
                "tags": [
                    "PRICING TYPES"
                ],
                "operationId": "Update",
                "deprecated": false,
                "produces": [
                    "application/json"
                ],
                "parameters": [
                    {
                        "name": "Body",
                        "in": "body",
                        "required": true,
                        "description": "",
                        "schema": {
                            "$ref": "#/definitions/UpdateRequest"
                        }
                    },
                    {
                        "name": "Content-Type",
                        "in": "header",
                        "required": true,
                        "type": "string",
                        "description": "",
                        "default": "application/json",
                    },
                    {
                        "name": "typeId",
                        "in": "path",
                        "required": true,
                        "type": "integer",
                        "format": "int32",
                        "description": ""
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                }
            },
            "patch": {
                "description": "",
                "summary": "Update Status",
                "tags": [
                    "PRICING TYPES"
                ],
                "operationId": "UpdateStatus",
                "deprecated": false,
                "produces": [
                    "application/json"
                ],
                "parameters": [
                    {
                        "name": "Body",
                        "in": "body",
                        "required": true,
                        "description": "",
                        "schema": {
                            "$ref": "#/definitions/UpdateStatusRequest"
                        }
                    },
                    {
                        "name": "Content-Type",
                        "in": "header",
                        "required": true,
                        "type": "string",
                        "description": "",
                        "default": "application/json",
                    },
                    {
                        "name": "typeId",
                        "in": "path",
                        "required": true,
                        "type": "integer",
                        "format": "int32",
                        "description": ""
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                }
            }
        },
        "/pricing/type/{typeId}": {
            "delete": {
                "description": "",
                "summary": "Delete",
                "tags": [
                    "PRICING TYPES"
                ],
                "operationId": "Delete",
                "deprecated": false,
                "produces": [
                    "application/json"
                ],
                "parameters": [
                    {
                        "name": "Content-Type",
                        "in": "header",
                        "required": true,
                        "type": "string",
                        "description": "",
                        "default": "application/json",
                    },
                    {
                        "name": "typeId",
                        "in": "path",
                        "required": true,
                        "type": "integer",
                        "format": "int32",
                        "description": ""
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                }
            }
        },
        "/pricing/master": {
            "get": {
                "description": "",
                "summary": "Get by company id",
                "tags": [
                    "PRICING MASTER"
                ],
                "operationId": "Getbycompanyid",
                "deprecated": false,
                "produces": [
                    "application/json"
                ],
                "parameters": [
                    {
                        "name": "companyId",
                        "in": "query",
                        "required": true,
                        "type": "integer",
                        "format": "int32",
                        "description": ""
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                }
            },
            "post": {
                "description": "",
                "summary": "Add",
                "tags": [
                    "PRICING MASTER"
                ],
                "operationId": "PostAdd",
                "deprecated": false,
                "produces": [
                    "application/json"
                ],
                "parameters": [
                    {
                        "name": "Body",
                        "in": "body",
                        "required": true,
                        "description": "",
                        "schema": {
                            "$ref": "#/definitions/AddRequest1"
                        }
                    },
                    {
                        "name": "Content-Type",
                        "in": "header",
                        "required": true,
                        "type": "string",
                        "description": "",
                        "default": "application/json",
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                }
            }
        },
        "/pricing/master/{pricingId}": {
            "get": {
                "description": "",
                "summary": "Get by id",
                "tags": [
                    "PRICING MASTER"
                ],
                "operationId": "Getbyid1",
                "deprecated": false,
                "produces": [
                    "application/json"
                ],
                "parameters": [{
                    "name": "pricingId",
                    "in": "path",
                    "required": true,
                    "type": "integer",
                    "format": "int32",
                    "description": ""
                }],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                }
            },
            "put": {
                "description": "",
                "summary": "Update",
                "tags": [
                    "PRICING MASTER"
                ],
                "operationId": "PutUpdate",
                "deprecated": false,
                "produces": [
                    "application/json"
                ],
                "parameters": [
                    {
                        "name": "Body",
                        "in": "body",
                        "required": true,
                        "description": "",
                        "schema": {
                            "$ref": "#/definitions/UpdateRequest1"
                        }
                    },
                    {
                        "name": "Content-Type",
                        "in": "header",
                        "required": true,
                        "type": "string",
                        "description": "",
                        "default": "application/json",
                    },
                    {
                        "name": "pricingId",
                        "in": "path",
                        "required": true,
                        "type": "integer",
                        "format": "int32",
                        "description": ""
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                }
            },
            "patch": {
                "description": "",
                "summary": "Update Status",
                "tags": [
                    "PRICING MASTER"
                ],
                "operationId": "PatchUpdateStatus",
                "deprecated": false,
                "produces": [
                    "application/json"
                ],
                "parameters": [
                    {
                        "name": "Body",
                        "in": "body",
                        "required": true,
                        "description": "",
                        "schema": {
                            "$ref": "#/definitions/UpdateStatusRequest"
                        }
                    },
                    {
                        "name": "Content-Type",
                        "in": "header",
                        "required": true,
                        "type": "string",
                        "description": "",
                        "default": "application/json",
                    },
                    {
                        "name": "pricingId",
                        "in": "path",
                        "required": true,
                        "type": "integer",
                        "format": "int32",
                        "description": ""
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                }
            }
        },
        "/pricing/master/{pricingId}/details": {
            "get": {
                "description": "",
                "summary": "Get details by id",
                "tags": [
                    "PRICING MASTER"
                ],
                "operationId": "Getdetailsbyid",
                "deprecated": false,
                "produces": [
                    "application/json"
                ],
                "parameters": [{
                    "name": "pricingId",
                    "in": "path",
                    "required": true,
                    "type": "integer",
                    "format": "int32",
                    "description": ""
                }],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                }
            }
        },
        "/pricing/master/{pricingId}": {
            "delete": {
                "description": "",
                "summary": "Delete",
                "tags": [
                    "PRICING MASTER"
                ],
                "operationId": "Delete1",
                "deprecated": false,
                "produces": [
                    "application/json"
                ],
                "parameters": [
                    {
                        "name": "Content-Type",
                        "in": "header",
                        "required": true,
                        "type": "string",
                        "description": "",
                        "default": "application/json",
                    },
                    {
                        "name": "pricingId",
                        "in": "path",
                        "required": true,
                        "type": "integer",
                        "format": "int32",
                        "description": ""
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                }
            }
        },
        "/pricing/product": {
            "get": {
                "description": "",
                "summary": "Get by pricing id",
                "tags": [
                    "PRODUCT PRICING"
                ],
                "operationId": "Getbypricingid",
                "deprecated": false,
                "produces": [
                    "application/json"
                ],
                "parameters": [
                    {
                        "name": "pricingId",
                        "in": "query",
                        "required": true,
                        "type": "integer",
                        "format": "int32",
                        "description": ""
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                }
            },
            "post": {
                "description": "",
                "summary": "Add",
                "tags": [
                    "PRODUCT PRICING"
                ],
                "operationId": "PostAdd1",
                "deprecated": false,
                "produces": [
                    "application/json"
                ],
                "parameters": [
                    {
                        "name": "Body",
                        "in": "body",
                        "required": true,
                        "description": "",
                        "schema": {
                            "$ref": "#/definitions/AddRequest2"
                        }
                    },
                    {
                        "name": "Content-Type",
                        "in": "header",
                        "required": true,
                        "type": "string",
                        "description": "",
                        "default": "application/json",
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                }
            }
        },
        "/pricing/product/{productId}": {
            "get": {
                "description": "",
                "summary": "Get by id",
                "tags": [
                    "PRODUCT PRICING"
                ],
                "operationId": "Getbyid12",
                "deprecated": false,
                "produces": [
                    "application/json"
                ],
                "parameters": [
                    {
                        "name": "productId",
                        "in": "path",
                        "required": true,
                        "type": "integer",
                        "format": "int32",
                        "description": ""
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                }
            },
            "put": {
                "description": "",
                "summary": "Update",
                "tags": [
                    "PRODUCT PRICING"
                ],
                "operationId": "PutUpdate1",
                "deprecated": false,
                "produces": [
                    "application/json"
                ],
                "parameters": [
                    {
                        "name": "Body",
                        "in": "body",
                        "required": true,
                        "description": "",
                        "schema": {
                            "$ref": "#/definitions/UpdateRequest2"
                        }
                    },
                    {
                        "name": "Content-Type",
                        "in": "header",
                        "required": true,
                        "type": "string",
                        "description": "",
                        "default": "application/json",
                    },
                    {
                        "name": "productId",
                        "in": "path",
                        "required": true,
                        "type": "integer",
                        "format": "int32",
                        "description": ""
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                }
            },
            "patch": {
                "description": "",
                "summary": "Update Status",
                "tags": [
                    "PRODUCT PRICING"
                ],
                "operationId": "PatchUpdateStatus1",
                "deprecated": false,
                "produces": [
                    "application/json"
                ],
                "parameters": [
                    {
                        "name": "Body",
                        "in": "body",
                        "required": true,
                        "description": "",
                        "schema": {
                            "$ref": "#/definitions/UpdateStatusRequest"
                        }
                    },
                    {
                        "name": "Content-Type",
                        "in": "header",
                        "required": true,
                        "type": "string",
                        "description": "",
                        "default": "application/json",
                    },
                    {
                        "name": "productId",
                        "in": "path",
                        "required": true,
                        "type": "integer",
                        "format": "int32",
                        "description": ""
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                }
            }
        },
        "/pricing/product/{productId}": {
            "delete": {
                "description": "",
                "summary": "Delete",
                "tags": [
                    "PRODUCT PRICING"
                ],
                "operationId": "Delete12",
                "deprecated": false,
                "produces": [
                    "application/json"
                ],
                "parameters": [
                    {
                        "name": "Content-Type",
                        "in": "header",
                        "required": true,
                        "type": "string",
                        "description": "",
                        "default": "application/json",
                    },
                    {
                        "name": "productId",
                        "in": "path",
                        "required": true,
                        "type": "integer",
                        "format": "int32",
                        "description": ""
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                }
            }
        },
        "/pricing/perkm": {
            "get": {
                "description": "",
                "summary": "Get by pricing id",
                "tags": [
                    "PER KM PRICING"
                ],
                "operationId": "Getbypricingid1",
                "deprecated": false,
                "produces": [
                    "application/json"
                ],
                "parameters": [
                    {
                        "name": "pricingId",
                        "in": "query",
                        "required": true,
                        "type": "integer",
                        "format": "int32",
                        "description": ""
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                }
            },
            "post": {
                "description": "",
                "summary": "Add",
                "tags": [
                    "PER KM PRICING"
                ],
                "operationId": "PostAdd12",
                "deprecated": false,
                "produces": [
                    "application/json"
                ],
                "parameters": [
                    {
                        "name": "Body",
                        "in": "body",
                        "required": true,
                        "description": "",
                        "schema": {
                            "$ref": "#/definitions/AddRequest3"
                        }
                    },
                    {
                        "name": "Content-Type",
                        "in": "header",
                        "required": true,
                        "type": "string",
                        "description": "",
                        "default": "application/json",
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                }
            }
        },
        "/pricing/perkm/{perkmId}": {
            "get": {
                "description": "",
                "summary": "Get by id",
                "tags": [
                    "PER KM PRICING"
                ],
                "operationId": "Getbyid123",
                "deprecated": false,
                "produces": [
                    "application/json"
                ],
                "parameters": [{
                    "name": "perkmId",
                    "in": "path",
                    "required": true,
                    "type": "integer",
                    "format": "int32",
                    "description": ""
                }],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                }
            },
            "put": {
                "description": "",
                "summary": "Update",
                "tags": [
                    "PER KM PRICING"
                ],
                "operationId": "PutUpdate12",
                "deprecated": false,
                "produces": [
                    "application/json"
                ],
                "parameters": [
                    {
                        "name": "Body",
                        "in": "body",
                        "required": true,
                        "description": "",
                        "schema": {
                            "$ref": "#/definitions/UpdateRequest3"
                        }
                    },
                    {
                        "name": "Content-Type",
                        "in": "header",
                        "required": true,
                        "type": "string",
                        "description": "",
                        "default": "application/json",
                    },
                    {
                        "name": "perkmId",
                        "in": "path",
                        "required": true,
                        "type": "integer",
                        "format": "int32",
                        "description": ""
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                }
            },
            "patch": {
                "description": "",
                "summary": "Update Status",
                "tags": [
                    "PER KM PRICING"
                ],
                "operationId": "PatchUpdateStatus12",
                "deprecated": false,
                "produces": [
                    "application/json"
                ],
                "parameters": [
                    {
                        "name": "Body",
                        "in": "body",
                        "required": true,
                        "description": "",
                        "schema": {
                            "$ref": "#/definitions/UpdateStatusRequest"
                        }
                    },
                    {
                        "name": "Content-Type",
                        "in": "header",
                        "required": true,
                        "type": "string",
                        "description": "",
                        "default": "application/json",
                    },
                    {
                        "name": "perkmId",
                        "in": "path",
                        "required": true,
                        "type": "integer",
                        "format": "int32",
                        "description": ""
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                }
            },
            "delete": {
                "description": "",
                "summary": "Delete",
                "tags": [
                    "PER KM PRICING"
                ],
                "operationId": "Delete123",
                "deprecated": false,
                "produces": [
                    "application/json"
                ],
                "parameters": [
                    {
                        "name": "Content-Type",
                        "in": "header",
                        "required": true,
                        "type": "string",
                        "description": "",
                        "default": "application/json",
                    },
                    {
                        "name": "perkmId",
                        "in": "path",
                        "required": true,
                        "type": "integer",
                        "format": "int32",
                        "description": ""
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                }
            }
        },
        "/pricing/perkm/fare": {
            "get": {
                "description": "",
                "summary": "Get fare",
                "tags": [
                    "PER KM PRICING"
                ],
                "operationId": "Getfare",
                "deprecated": false,
                "produces": [
                    "application/json"
                ],
                "parameters": [
                    {
                        "name": "Content-Type",
                        "in": "header",
                        "required": true,
                        "type": "string",
                        "description": "",
                        "default": "application/json",
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                }
            }
        },
        "/pricing/kmslab": {
            "get": {
                "description": "",
                "summary": "Get by pricing id",
                "tags": [
                    "KM SLAB PRICING"
                ],
                "operationId": "Getbypricingid12",
                "deprecated": false,
                "produces": [
                    "application/json"
                ],
                "parameters": [
                    {
                        "name": "pricingId",
                        "in": "query",
                        "required": true,
                        "type": "integer",
                        "format": "int32",
                        "description": ""
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                }
            },
            "post": {
                "description": "",
                "summary": "Add",
                "tags": [
                    "KM SLAB PRICING"
                ],
                "operationId": "PostAdd123",
                "deprecated": false,
                "produces": [
                    "application/json"
                ],
                "parameters": [
                    {
                        "name": "Body",
                        "in": "body",
                        "required": true,
                        "description": "",
                        "schema": {
                            "$ref": "#/definitions/AddRequest4"
                        }
                    },
                    {
                        "name": "Content-Type",
                        "in": "header",
                        "required": true,
                        "type": "string",
                        "description": "",
                        "default": "application/json",
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                }
            }
        },
        "/pricing/kmslab/{kmslabId}": {
            "get": {
                "description": "",
                "summary": "Get by id",
                "tags": [
                    "KM SLAB PRICING"
                ],
                "operationId": "Getbyid1234",
                "deprecated": false,
                "produces": [
                    "application/json"
                ],
                "parameters": [{
                    "name": "kmslabId",
                    "in": "path",
                    "required": true,
                    "type": "integer",
                    "format": "int32",
                    "description": ""
                }],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                }
            },
            "put": {
                "description": "",
                "summary": "Update",
                "tags": [
                    "KM SLAB PRICING"
                ],
                "operationId": "PutUpdate123",
                "deprecated": false,
                "produces": [
                    "application/json"
                ],
                "parameters": [
                    {
                        "name": "Body",
                        "in": "body",
                        "required": true,
                        "description": "",
                        "schema": {
                            "$ref": "#/definitions/UpdateRequest4"
                        }
                    },
                    {
                        "name": "Content-Type",
                        "in": "header",
                        "required": true,
                        "type": "string",
                        "description": "",
                        "default": "application/json",
                    },
                    {
                        "name": "kmslabId",
                        "in": "path",
                        "required": true,
                        "type": "integer",
                        "format": "int32",
                        "description": ""
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                }
            },
            "patch": {
                "description": "",
                "summary": "Update Status",
                "tags": [
                    "KM SLAB PRICING"
                ],
                "operationId": "PatchUpdateStatus123",
                "deprecated": false,
                "produces": [
                    "application/json"
                ],
                "parameters": [
                    {
                        "name": "Body",
                        "in": "body",
                        "required": true,
                        "description": "",
                        "schema": {
                            "$ref": "#/definitions/UpdateStatusRequest"
                        }
                    },
                    {
                        "name": "Content-Type",
                        "in": "header",
                        "required": true,
                        "type": "string",
                        "description": "",
                        "default": "application/json",
                    },
                    {
                        "name": "kmslabId",
                        "in": "path",
                        "required": true,
                        "type": "integer",
                        "format": "int32",
                        "description": ""
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                }
            }
        },
        "/pricing/kmslab/{kmslabId}": {
            "delete": {
                "description": "",
                "summary": "Delete",
                "tags": [
                    "KM SLAB PRICING"
                ],
                "operationId": "Delete1234",
                "deprecated": false,
                "produces": [
                    "application/json"
                ],
                "parameters": [
                    {
                        "name": "Content-Type",
                        "in": "header",
                        "required": true,
                        "type": "string",
                        "description": "",
                        "default": "application/json",
                    },
                    {
                        "name": "kmslabId",
                        "in": "path",
                        "required": true,
                        "type": "integer",
                        "format": "int32",
                        "description": ""
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                }
            }
        },
        "/pricing/kmslab/fare": {
            "get": {
                "description": "",
                "summary": "Get fare",
                "tags": [
                    "KM SLAB PRICING"
                ],
                "operationId": "Getfare1",
                "deprecated": false,
                "produces": [
                    "application/json"
                ],
                "parameters": [
                    {
                        "name": "Content-Type",
                        "in": "header",
                        "required": true,
                        "type": "string",
                        "description": "",
                        "default": "application/json",
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                }
            }
        },
        "/pricing/flat": {
            "get": {
                "description": "",
                "summary": "Get by pricing id",
                "tags": [
                    "FLAT PRICING"
                ],
                "operationId": "Getbypricingid123",
                "deprecated": false,
                "produces": [
                    "application/json"
                ],
                "parameters": [
                    {
                        "name": "pricingId",
                        "in": "query",
                        "required": true,
                        "type": "integer",
                        "format": "int32",
                        "description": ""
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                }
            },
            "post": {
                "description": "",
                "summary": "Add",
                "tags": [
                    "FLAT PRICING"
                ],
                "operationId": "PostAdd1234",
                "deprecated": false,
                "produces": [
                    "application/json"
                ],
                "parameters": [
                    {
                        "name": "Body",
                        "in": "body",
                        "required": true,
                        "description": "",
                        "schema": {
                            "$ref": "#/definitions/AddRequest5"
                        }
                    },
                    {
                        "name": "Content-Type",
                        "in": "header",
                        "required": true,
                        "type": "string",
                        "description": "",
                        "default": "application/json",
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                }
            }
        },
        "/pricing/flat/{flatId}": {
            "get": {
                "description": "",
                "summary": "Get by id",
                "tags": [
                    "FLAT PRICING"
                ],
                "operationId": "Getbyid12345",
                "deprecated": false,
                "produces": [
                    "application/json"
                ],
                "parameters": [{
                    "name": "flatId",
                    "in": "path",
                    "required": true,
                    "type": "integer",
                    "format": "int32",
                    "description": ""
                }],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                }
            },
            "put": {
                "description": "",
                "summary": "Update",
                "tags": [
                    "FLAT PRICING"
                ],
                "operationId": "PutUpdate1234",
                "deprecated": false,
                "produces": [
                    "application/json"
                ],
                "parameters": [
                    {
                        "name": "Body",
                        "in": "body",
                        "required": true,
                        "description": "",
                        "schema": {
                            "$ref": "#/definitions/UpdateRequest5"
                        }
                    },
                    {
                        "name": "Content-Type",
                        "in": "header",
                        "required": true,
                        "type": "string",
                        "description": "",
                        "default": "application/json",
                    },
                    {
                        "name": "flatId",
                        "in": "path",
                        "required": true,
                        "type": "integer",
                        "format": "int32",
                        "description": ""
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                }
            },
            "patch": {
                "description": "",
                "summary": "Update Status",
                "tags": [
                    "FLAT PRICING"
                ],
                "operationId": "PatchUpdateStatus1234",
                "deprecated": false,
                "produces": [
                    "application/json"
                ],
                "parameters": [
                    {
                        "name": "Body",
                        "in": "body",
                        "required": true,
                        "description": "",
                        "schema": {
                            "$ref": "#/definitions/UpdateStatusRequest"
                        }
                    },
                    {
                        "name": "Content-Type",
                        "in": "header",
                        "required": true,
                        "type": "string",
                        "description": "",
                        "default": "application/json",
                    },
                    {
                        "name": "flatId",
                        "in": "path",
                        "required": true,
                        "type": "integer",
                        "format": "int32",
                        "description": ""
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                }
            }
        },
        "/pricing/flat/{flatId}": {
            "delete": {
                "description": "",
                "summary": "Delete",
                "tags": [
                    "FLAT PRICING"
                ],
                "operationId": "Delete12345",
                "deprecated": false,
                "produces": [
                    "application/json"
                ],
                "parameters": [
                    {
                        "name": "Content-Type",
                        "in": "header",
                        "required": true,
                        "type": "string",
                        "description": "",
                        "default": "application/json",
                    },
                    {
                        "name": "flatId",
                        "in": "path",
                        "required": true,
                        "type": "integer",
                        "format": "int32",
                        "description": ""
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                }
            }
        },
        "/pricing/flat/fare": {
            "get": {
                "description": "",
                "summary": "Get fare",
                "tags": [
                    "FLAT PRICING"
                ],
                "operationId": "Getfare12",
                "deprecated": false,
                "produces": [
                    "application/json"
                ],
                "parameters": [
                    {
                        "name": "Content-Type",
                        "in": "header",
                        "required": true,
                        "type": "string",
                        "description": "",
                        "default": "application/json",
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                }
            }
        },
        "/service": {
            "get": {
                "description": "",
                "summary": "Get by company id",
                "tags": [
                    "SERVICES"
                ],
                "operationId": "Getbycompanyid1",
                "deprecated": false,
                "produces": [
                    "application/json"
                ],
                "parameters": [
                    {
                        "name": "companyId",
                        "in": "query",
                        "required": true,
                        "type": "integer",
                        "format": "int32",
                        "description": ""
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                }
            },
            "post": {
                "description": "",
                "summary": "Add",
                "tags": [
                    "SERVICES"
                ],
                "operationId": "PostAdd12345",
                "deprecated": false,
                "produces": [
                    "application/json"
                ],
                "parameters": [
                    {
                        "name": "Body",
                        "in": "body",
                        "required": true,
                        "description": "",
                        "schema": {
                            "$ref": "#/definitions/AddRequest6"
                        }
                    },
                    {
                        "name": "Content-Type",
                        "in": "header",
                        "required": true,
                        "type": "string",
                        "description": "",
                        "default": "application/json",
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                }
            }
        },
        "/service/{serviceId}": {
            "get": {
                "description": "",
                "summary": "Get by id",
                "tags": [
                    "SERVICES"
                ],
                "operationId": "Getbyid123456",
                "deprecated": false,
                "produces": [
                    "application/json"
                ],
                "parameters": [{
                    "name": "serviceId",
                    "in": "path",
                    "required": true,
                    "type": "integer",
                    "format": "int32",
                    "description": ""
                }],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                }
            }
        },
        "/service/{serviceId}": {
            "put": {
                "description": "",
                "summary": "Update",
                "tags": [
                    "SERVICES"
                ],
                "operationId": "PutUpdate12345",
                "deprecated": false,
                "produces": [
                    "application/json"
                ],
                "parameters": [
                    {
                        "name": "Body",
                        "in": "body",
                        "required": true,
                        "description": "",
                        "schema": {
                            "$ref": "#/definitions/UpdateRequest6"
                        }
                    },
                    {
                        "name": "Content-Type",
                        "in": "header",
                        "required": true,
                        "type": "string",
                        "description": "",
                        "default": "application/json",
                    },
                    {
                        "name": "serviceId",
                        "in": "path",
                        "required": true,
                        "type": "integer",
                        "format": "int32",
                        "description": ""
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                }
            },
            "patch": {
                "description": "",
                "summary": "Update Status",
                "tags": [
                    "SERVICES"
                ],
                "operationId": "PatchUpdateStatus12345",
                "deprecated": false,
                "produces": [
                    "application/json"
                ],
                "parameters": [
                    {
                        "name": "Body",
                        "in": "body",
                        "required": true,
                        "description": "",
                        "schema": {
                            "$ref": "#/definitions/UpdateStatusRequest"
                        }
                    },
                    {
                        "name": "Content-Type",
                        "in": "header",
                        "required": true,
                        "type": "string",
                        "description": "",
                        "default": "application/json",
                    },
                    {
                        "name": "serviceId",
                        "in": "path",
                        "required": true,
                        "type": "integer",
                        "format": "int32",
                        "description": ""
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                }
            }
        },
        "/service/{serviceId}": {
            "delete": {
                "description": "",
                "summary": "Delete",
                "tags": [
                    "SERVICES"
                ],
                "operationId": "Delete123456",
                "deprecated": false,
                "produces": [
                    "application/json"
                ],
                "parameters": [
                    {
                        "name": "Content-Type",
                        "in": "header",
                        "required": true,
                        "type": "string",
                        "description": "",
                        "default": "application/json",
                    },
                    {
                        "name": "serviceId",
                        "in": "path",
                        "required": true,
                        "type": "integer",
                        "format": "int32",
                        "description": ""
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                }
            }
        },
        "/pricing/service": {
            "get": {
                "description": "",
                "summary": "Get by pricing id",
                "tags": [
                    "SERVICE MAPPING"
                ],
                "operationId": "Getbypricingid1234",
                "deprecated": false,
                "produces": [
                    "application/json"
                ],
                "parameters": [
                    {
                        "name": "pricingId",
                        "in": "query",
                        "required": true,
                        "type": "integer",
                        "format": "int32",
                        "description": ""
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                }
            },
            "post": {
                "description": "",
                "summary": "Add Or Update",
                "tags": [
                    "SERVICE MAPPING"
                ],
                "operationId": "AddOrUpdate",
                "deprecated": false,
                "produces": [
                    "application/json"
                ],
                "parameters": [
                    {
                        "name": "Body",
                        "in": "body",
                        "required": true,
                        "description": "",
                        "schema": {
                            "$ref": "#/definitions/AddOrUpdateRequest"
                        }
                    },
                    {
                        "name": "Content-Type",
                        "in": "header",
                        "required": true,
                        "type": "string",
                        "description": "",
                        "default": "application/json",
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                }
            }
        },
        "/pricing/service/{serviceId}": {
            "get": {
                "description": "",
                "summary": "Get by id",
                "tags": [
                    "SERVICE MAPPING"
                ],
                "operationId": "Getbyid1234567",
                "deprecated": false,
                "produces": [
                    "application/json"
                ],
                "parameters": [{
                    "name": "serviceId",
                    "in": "path",
                    "required": true,
                    "type": "integer",
                    "format": "int32",
                    "description": ""
                }],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                }
            },
            "patch": {
                "description": "",
                "summary": "Update Status",
                "tags": [
                    "SERVICE MAPPING"
                ],
                "operationId": "PatchUpdateStatus123456",
                "deprecated": false,
                "produces": [
                    "application/json"
                ],
                "parameters": [
                    {
                        "name": "Body",
                        "in": "body",
                        "required": true,
                        "description": "",
                        "schema": {
                            "$ref": "#/definitions/UpdateStatusRequest"
                        }
                    },
                    {
                        "name": "Content-Type",
                        "in": "header",
                        "required": true,
                        "type": "string",
                        "description": "",
                        "default": "application/json",
                    },
                    {
                        "name": "serviceId",
                        "in": "path",
                        "required": true,
                        "type": "integer",
                        "format": "int32",
                        "description": ""
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                }
            }
        },
        "/pricing/service/{serviceId}": {
            "delete": {
                "description": "",
                "summary": "Delete",
                "tags": [
                    "SERVICE MAPPING"
                ],
                "operationId": "Delete1234567",
                "deprecated": false,
                "produces": [
                    "application/json"
                ],
                "parameters": [
                    {
                        "name": "Content-Type",
                        "in": "header",
                        "required": true,
                        "type": "string",
                        "description": "",
                        "default": "application/json",
                    },
                    {
                        "name": "serviceId",
                        "in": "path",
                        "required": true,
                        "type": "integer",
                        "format": "int32",
                        "description": ""
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                }
            }
        },
        "/tax": {
            "get": {
                "description": "",
                "summary": "Get by company id",
                "tags": [
                    "TAXES"
                ],
                "operationId": "Getbycompanyid12",
                "deprecated": false,
                "produces": [
                    "application/json"
                ],
                "parameters": [
                    {
                        "name": "companyId",
                        "in": "query",
                        "required": true,
                        "type": "integer",
                        "format": "int32",
                        "description": ""
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                }
            },
            "post": {
                "description": "",
                "summary": "Add",
                "tags": [
                    "TAXES"
                ],
                "operationId": "PostAdd123456",
                "deprecated": false,
                "produces": [
                    "application/json"
                ],
                "parameters": [
                    {
                        "name": "Body",
                        "in": "body",
                        "required": true,
                        "description": "",
                        "schema": {
                            "$ref": "#/definitions/AddRequest7"
                        }
                    },
                    {
                        "name": "Content-Type",
                        "in": "header",
                        "required": true,
                        "type": "string",
                        "description": "",
                        "default": "application/json",
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                }
            }
        },
        "/tax/{taxId}": {
            "get": {
                "description": "",
                "summary": "Get by id",
                "tags": [
                    "TAXES"
                ],
                "operationId": "Getbyid12345678",
                "deprecated": false,
                "produces": [
                    "application/json"
                ],
                "parameters": [{
                    "name": "taxId",
                    "in": "path",
                    "required": true,
                    "type": "integer",
                    "format": "int32",
                    "description": ""
                }],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                }
            }
        },
        "/tax/{taxId}": {
            "put": {
                "description": "",
                "summary": "Update",
                "tags": [
                    "TAXES"
                ],
                "operationId": "PutUpdate123456",
                "deprecated": false,
                "produces": [
                    "application/json"
                ],
                "parameters": [
                    {
                        "name": "Body",
                        "in": "body",
                        "required": true,
                        "description": "",
                        "schema": {
                            "$ref": "#/definitions/UpdateRequest7"
                        }
                    },
                    {
                        "name": "Content-Type",
                        "in": "header",
                        "required": true,
                        "type": "string",
                        "description": "",
                        "default": "application/json",
                    },
                    {
                        "name": "taxId",
                        "in": "path",
                        "required": true,
                        "type": "integer",
                        "format": "int32",
                        "description": ""
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                }
            },
            "patch": {
                "description": "",
                "summary": "Update Status",
                "tags": [
                    "TAXES"
                ],
                "operationId": "PatchUpdateStatus1234567",
                "deprecated": false,
                "produces": [
                    "application/json"
                ],
                "parameters": [
                    {
                        "name": "Body",
                        "in": "body",
                        "required": true,
                        "description": "",
                        "schema": {
                            "$ref": "#/definitions/UpdateStatusRequest"
                        }
                    },
                    {
                        "name": "Content-Type",
                        "in": "header",
                        "required": true,
                        "type": "string",
                        "description": "",
                        "default": "application/json",
                    },
                    {
                        "name": "taxId",
                        "in": "path",
                        "required": true,
                        "type": "integer",
                        "format": "int32",
                        "description": ""
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                }
            }
        },
        "/tax/{taxId}": {
            "delete": {
                "description": "",
                "summary": "Delete",
                "tags": [
                    "TAXES"
                ],
                "operationId": "Delete12345678",
                "deprecated": false,
                "produces": [
                    "application/json"
                ],
                "parameters": [
                    {
                        "name": "Content-Type",
                        "in": "header",
                        "required": true,
                        "type": "string",
                        "description": "",
                        "default": "application/json",
                    },
                    {
                        "name": "taxId",
                        "in": "path",
                        "required": true,
                        "type": "integer",
                        "format": "int32",
                        "description": ""
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                }
            }
        },
        "/pricing/tax": {
            "get": {
                "description": "",
                "summary": "Get by pricing id",
                "tags": [
                    "TAX MAPPING"
                ],
                "operationId": "Getbypricingid12345",
                "deprecated": false,
                "produces": [
                    "application/json"
                ],
                "parameters": [
                    {
                        "name": "pricingId",
                        "in": "query",
                        "required": true,
                        "type": "integer",
                        "format": "int32",
                        "description": ""
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                }
            },
            "post": {
                "description": "",
                "summary": "Add Or Update",
                "tags": [
                    "TAX MAPPING"
                ],
                "operationId": "PostAddOrUpdate",
                "deprecated": false,
                "produces": [
                    "application/json"
                ],
                "parameters": [
                    {
                        "name": "Body",
                        "in": "body",
                        "required": true,
                        "description": "",
                        "schema": {
                            "$ref": "#/definitions/AddOrUpdateRequest1"
                        }
                    },
                    {
                        "name": "Content-Type",
                        "in": "header",
                        "required": true,
                        "type": "string",
                        "description": "",
                        "default": "application/json",
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                }
            }
        },
        "/pricing/tax/{taxId}": {
            "get": {
                "description": "",
                "summary": "Get by id",
                "tags": [
                    "TAX MAPPING"
                ],
                "operationId": "Getbyid123456789",
                "deprecated": false,
                "produces": [
                    "application/json"
                ],
                "parameters": [{
                    "name": "taxId",
                    "in": "path",
                    "required": true,
                    "type": "integer",
                    "format": "int32",
                    "description": ""
                }],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                }
            },
            "patch": {
                "description": "",
                "summary": "Update Status",
                "tags": [
                    "TAX MAPPING"
                ],
                "operationId": "PatchUpdateStatus12345678",
                "deprecated": false,
                "produces": [
                    "application/json"
                ],
                "parameters": [
                    {
                        "name": "Body",
                        "in": "body",
                        "required": true,
                        "description": "",
                        "schema": {
                            "$ref": "#/definitions/UpdateStatusRequest9"
                        }
                    },
                    {
                        "name": "Content-Type",
                        "in": "header",
                        "required": true,
                        "type": "string",
                        "description": "",
                        "default": "application/json",
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                }
            }
        },
        "/pricing/tax/{taxId}": {
            "delete": {
                "description": "",
                "summary": "Delete",
                "tags": [
                    "TAX MAPPING"
                ],
                "operationId": "Delete123456789",
                "deprecated": false,
                "produces": [
                    "application/json"
                ],
                "parameters": [
                    {
                        "name": "Content-Type",
                        "in": "header",
                        "required": true,
                        "type": "string",
                        "description": "",
                        "default": "application/json",
                    },
                    {
                        "name": "taxId",
                        "in": "path",
                        "required": true,
                        "type": "integer",
                        "format": "int32",
                        "description": ""
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                }
            }
        },
        "/pricings": {
            "get": {
                "description": "",
                "summary": "Get All Pricings",
                "tags": [
                    "APPLICATION LOGIC"
                ],
                "operationId": "GetAllPricings",
                "deprecated": false,
                "produces": [
                    "application/json"
                ],
                "parameters": [
                    {
                        "name": "companyId",
                        "in": "query",
                        "required": true,
                        "type": "integer",
                        "format": "int32",
                        "description": ""
                    },
                    {
                        "name": "Content-Type",
                        "in": "header",
                        "required": true,
                        "type": "string",
                        "description": "",
                        "default": "application/json",
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                }
            },
            "post": {
                "description": "",
                "summary": "Add Pricing Master",
                "tags": [
                    "APPLICATION LOGIC"
                ],
                "operationId": "AddPricingMaster",
                "deprecated": false,
                "produces": [
                    "application/json"
                ],
                "parameters": [
                    {
                        "name": "Body",
                        "in": "body",
                        "required": true,
                        "description": "",
                        "schema": {
                            "$ref": "#/definitions/AddPricingMasterRequest"
                        }
                    },
                    {
                        "name": "Content-Type",
                        "in": "header",
                        "required": true,
                        "type": "string",
                        "description": "",
                        "default": "application/json",
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                }
            }
        },
        "/pricings/{pricingId}": {
            "get": {
                "description": "",
                "summary": "Get Pricing Details",
                "tags": [
                    "APPLICATION LOGIC"
                ],
                "operationId": "GetPricingDetails",
                "deprecated": false,
                "produces": [
                    "application/json"
                ],
                "parameters": [{
                    "name": "pricingId",
                    "in": "path",
                    "required": true,
                    "type": "integer",
                    "format": "int32",
                    "description": ""
                }],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                }
            }
        },
        "/pricing/types": {
            "get": {
                "description": "",
                "summary": "Get Pricing Types",
                "tags": [
                    "APPLICATION LOGIC"
                ],
                "operationId": "GetPricingTypes",
                "deprecated": false,
                "produces": [
                    "application/json"
                ],
                "parameters": [],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                }
            }
        },
        "/pricings/{pricingId}": {
            "put": {
                "description": "",
                "summary": "Update Pricing Master",
                "tags": [
                    "APPLICATION LOGIC"
                ],
                "operationId": "UpdatePricingMaster",
                "deprecated": false,
                "produces": [
                    "application/json"
                ],
                "parameters": [
                    {
                        "name": "Body",
                        "in": "body",
                        "required": true,
                        "description": "",
                        "schema": {
                            "$ref": "#/definitions/UpdatePricingMasterRequest"
                        }
                    },
                    {
                        "name": "Content-Type",
                        "in": "header",
                        "required": true,
                        "type": "string",
                        "description": "",
                        "default": "application/json",
                    },
                    {
                        "name": "pricingId",
                        "in": "path",
                        "required": true,
                        "type": "integer",
                        "format": "int32",
                        "description": ""
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                }
            },
            "delete": {
                "description": "",
                "summary": "Delete Pricing Master",
                "tags": [
                    "APPLICATION LOGIC"
                ],
                "operationId": "DeletePricingMaster",
                "deprecated": false,
                "produces": [
                    "application/json"
                ],
                "parameters": [],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                }
            }
        },
        "/pricings/fare": {
            "post": {
                "description": "",
                "summary": "Get Fare",
                "tags": [
                    "APPLICATION LOGIC"
                ],
                "operationId": "GetFare",
                "deprecated": false,
                "produces": [
                    "application/json"
                ],
                "parameters": [
                    {
                        "name": "Body",
                        "in": "body",
                        "required": true,
                        "description": "",
                        "schema": {
                            "$ref": "#/definitions/GetFareRequest"
                        }
                    },
                    {
                        "name": "Content-Type",
                        "in": "header",
                        "required": true,
                        "type": "string",
                        "description": "",
                        "default": "application/json",
                    }
                ],
                "responses": {
                    "200": {
                        "description": "",
                        "headers": {}
                    }
                }
            }
        }
    },
    "definitions": {
        "AddRequest": {
            "title": "AddRequest",
            "example": {
                "name": "fixe2d",
                "calculation": "Base fare + Flat fare + Value add + Tax  = Total price",
                "userId": "1"
            },
            "type": "object",
            "properties": {
                "name": {
                    "type": "string"
                },
                "calculation": {
                    "type": "string"
                },
                "userId": {
                    "type": "string"
                }
            },
            "required": [
                "name",
                "calculation",
                "userId"
            ]
        },
        "UpdateRequest": {
            "title": "UpdateRequest",
            "example": {
                "name": "fixed",
                "calculation": "Base fare + Flat fare + Value add + Tax  = Total price",
                "userId": "1"
            },
            "type": "object",
            "properties": {
                "name": {
                    "type": "string"
                },
                "calculation": {
                    "type": "string"
                },
                "userId": {
                    "type": "string"
                }
            },
            "required": [
                "name",
                "calculation",
                "userId"
            ]
        },
        "UpdateStatusRequest": {
            "title": "UpdateStatusRequest",
            "example": {
                "status": 1,
                "userId": "1"
            },
            "type": "object",
            "properties": {
                "status": {
                    "type": "integer",
                    "format": "int32"
                },
                "userId": {
                    "type": "string"
                }
            },
            "required": [
                "status",
                "userId"
            ]
        },
        "AddRequest1": {
            "title": "AddRequest1",
            "example": {
                "companyId": 1,
                "pricingTypeId": 1,
                "name": "test",
                "description": "Test",
                "baseAmount": 12,
                "cancellationAmount": 12,
                "waitingAmount": 34,
                "maximumAmount": 30,
                "hasPromoCode": 0,
                "userId": "1"
            },
            "type": "object",
            "properties": {
                "companyId": {
                    "type": "integer",
                    "format": "int32"
                },
                "pricingTypeId": {
                    "type": "integer",
                    "format": "int32"
                },
                "name": {
                    "type": "string"
                },
                "description": {
                    "type": "string"
                },
                "baseAmount": {
                    "type": "integer",
                    "format": "int32"
                },
                "cancellationAmount": {
                    "type": "integer",
                    "format": "int32"
                },
                "waitingAmount": {
                    "type": "integer",
                    "format": "int32"
                },
                "maximumAmount": {
                    "type": "integer",
                    "format": "int32"
                },
                "hasPromoCode": {
                    "type": "integer",
                    "format": "int32"
                },
                "userId": {
                    "type": "string"
                }
            },
            "required": [
                "companyId",
                "pricingTypeId",
                "name",
                "description",
                "baseAmount",
                "cancellationAmount",
                "waitingAmount",
                "maximumAmount",
                "hasPromoCode",
                "userId"
            ]
        },
        "UpdateRequest1": {
            "title": "UpdateRequest1",
            "example": {
                "companyId": 1,
                "pricingTypeId": 1,
                "name": "test",
                "description": "Test",
                "baseAmount": 12,
                "cancellationAmount": 12,
                "waitingAmount": 342,
                "maximumAmount": 30,
                "hasPromoCode": 0,
                "userId": "1"
            },
            "type": "object",
            "properties": {
                "companyId": {
                    "type": "integer",
                    "format": "int32"
                },
                "pricingTypeId": {
                    "type": "integer",
                    "format": "int32"
                },
                "name": {
                    "type": "string"
                },
                "description": {
                    "type": "string"
                },
                "baseAmount": {
                    "type": "integer",
                    "format": "int32"
                },
                "cancellationAmount": {
                    "type": "integer",
                    "format": "int32"
                },
                "waitingAmount": {
                    "type": "integer",
                    "format": "int32"
                },
                "maximumAmount": {
                    "type": "integer",
                    "format": "int32"
                },
                "hasPromoCode": {
                    "type": "integer",
                    "format": "int32"
                },
                "userId": {
                    "type": "string"
                }
            },
            "required": [
                "companyId",
                "pricingTypeId",
                "name",
                "description",
                "baseAmount",
                "cancellationAmount",
                "waitingAmount",
                "maximumAmount",
                "hasPromoCode",
                "userId"
            ]
        },
        "AddRequest2": {
            "title": "AddRequest2",
            "example": {
                "pricingId": 2,
                "companyProductId": 1,
                "locationProductId": 1,
                "userId": "1"
            },
            "type": "object",
            "properties": {
                "pricingId": {
                    "type": "integer",
                    "format": "int32"
                },
                "companyProductId": {
                    "type": "integer",
                    "format": "int32"
                },
                "locationProductId": {
                    "type": "integer",
                    "format": "int32"
                },
                "userId": {
                    "type": "string"
                }
            },
            "required": [
                "pricingId",
                "companyProductId",
                "locationProductId",
                "userId"
            ]
        },
        "UpdateRequest2": {
            "title": "UpdateRequest2",
            "example": {
                "pricingId": 2,
                "companyProductId": 1,
                "locationProductId": 2,
                "userId": "1"
            },
            "type": "object",
            "properties": {
                "pricingId": {
                    "type": "integer",
                    "format": "int32"
                },
                "companyProductId": {
                    "type": "integer",
                    "format": "int32"
                },
                "locationProductId": {
                    "type": "integer",
                    "format": "int32"
                },
                "userId": {
                    "type": "string"
                }
            },
            "required": [
                "pricingId",
                "companyProductId",
                "locationProductId",
                "userId"
            ]
        },
        "AddRequest3": {
            "title": "AddRequest3",
            "example": {
                "pricingId": 2,
                "km": "1",
                "perKmAmount": "10",
                "userId": "1"
            },
            "type": "object",
            "properties": {
                "pricingId": {
                    "type": "integer",
                    "format": "int32"
                },
                "km": {
                    "type": "string"
                },
                "perKmAmount": {
                    "type": "string"
                },
                "userId": {
                    "type": "string"
                }
            },
            "required": [
                "pricingId",
                "km",
                "perKmAmount",
                "userId"
            ]
        },
        "UpdateRequest3": {
            "title": "UpdateRequest3",
            "example": {
                "pricingId": 2,
                "km": "1",
                "perKmAmount": "10",
                "userId": "1"
            },
            "type": "object",
            "properties": {
                "pricingId": {
                    "type": "integer",
                    "format": "int32"
                },
                "km": {
                    "type": "string"
                },
                "perKmAmount": {
                    "type": "string"
                },
                "userId": {
                    "type": "string"
                }
            },
            "required": [
                "pricingId",
                "km",
                "perKmAmount",
                "userId"
            ]
        },
        "AddRequest4": {
            "title": "AddRequest4",
            "example": {
                "pricingId": 4,
                "kmSlab": [
                    {
                        "fromKm": 1,
                        "toKm": 5,
                        "fare": 10
                    },
                    {
                        "fromKm": 6,
                        "toKm": 10,
                        "fare": 20
                    }
                ],
                "userId": "1"
            },
            "type": "object",
            "properties": {
                "pricingId": {
                    "type": "integer",
                    "format": "int32"
                },
                "kmSlab": {
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/KmSlab"
                    }
                },
                "userId": {
                    "type": "string"
                }
            },
            "required": [
                "pricingId",
                "kmSlab",
                "userId"
            ]
        },
        "KmSlab": {
            "title": "KmSlab",
            "example": {
                "fromKm": 1,
                "toKm": 5,
                "fare": 10
            },
            "type": "object",
            "properties": {
                "fromKm": {
                    "type": "integer",
                    "format": "int32"
                },
                "toKm": {
                    "type": "integer",
                    "format": "int32"
                },
                "fare": {
                    "type": "integer",
                    "format": "int32"
                }
            },
            "required": [
                "fromKm",
                "toKm",
                "fare"
            ]
        },
        "UpdateRequest4": {
            "title": "UpdateRequest4",
            "example": {
                "pricingId": 4,
                "kmSlab": [
                    {
                        "fromKm": 1,
                        "toKm": 5,
                        "fare": 12
                    },
                    {
                        "fromKm": 6,
                        "toKm": 10,
                        "fare": 20
                    }
                ],
                "userId": "1"
            },
            "type": "object",
            "properties": {
                "pricingId": {
                    "type": "integer",
                    "format": "int32"
                },
                "kmSlab": {
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/KmSlab"
                    }
                },
                "userId": {
                    "type": "string"
                }
            },
            "required": [
                "pricingId",
                "kmSlab",
                "userId"
            ]
        },
        "AddRequest5": {
            "title": "AddRequest5",
            "example": {
                "pricingId": 5,
                "flatAmount": 1,
                "pricingTypeId": 4,
                "userId": "1"
            },
            "type": "object",
            "properties": {
                "pricingId": {
                    "type": "integer",
                    "format": "int32"
                },
                "flatAmount": {
                    "type": "integer",
                    "format": "int32"
                },
                "pricingTypeId": {
                    "type": "integer",
                    "format": "int32"
                },
                "userId": {
                    "type": "string"
                }
            },
            "required": [
                "pricingId",
                "flatAmount",
                "pricingTypeId",
                "userId"
            ]
        },
        "UpdateRequest5": {
            "title": "UpdateRequest5",
            "example": {
                "pricingId": 5,
                "flatAmount": 1,
                "pricingTypeId": 4,
                "userId": "1"
            },
            "type": "object",
            "properties": {
                "pricingId": {
                    "type": "integer",
                    "format": "int32"
                },
                "flatAmount": {
                    "type": "integer",
                    "format": "int32"
                },
                "pricingTypeId": {
                    "type": "integer",
                    "format": "int32"
                },
                "userId": {
                    "type": "string"
                }
            },
            "required": [
                "pricingId",
                "flatAmount",
                "pricingTypeId",
                "userId"
            ]
        },
        "AddRequest6": {
            "title": "AddRequest6",
            "example": {
                "companyId": 1,
                "serviceName": "Wifi",
                "serviceAmount": 10,
                "hasTax": 1,
                "userId": "1"
            },
            "type": "object",
            "properties": {
                "companyId": {
                    "type": "integer",
                    "format": "int32"
                },
                "serviceName": {
                    "type": "string"
                },
                "serviceAmount": {
                    "type": "integer",
                    "format": "int32"
                },
                "hasTax": {
                    "type": "integer",
                    "format": "int32"
                },
                "userId": {
                    "type": "string"
                }
            },
            "required": [
                "companyId",
                "serviceName",
                "serviceAmount",
                "hasTax",
                "userId"
            ]
        },
        "UpdateRequest6": {
            "title": "UpdateRequest6",
            "example": {
                "companyId": 1,
                "serviceName": "Wifi",
                "serviceAmount": 10,
                "hasTax": 1,
                "userId": "1"
            },
            "type": "object",
            "properties": {
                "companyId": {
                    "type": "integer",
                    "format": "int32"
                },
                "serviceName": {
                    "type": "string"
                },
                "serviceAmount": {
                    "type": "integer",
                    "format": "int32"
                },
                "hasTax": {
                    "type": "integer",
                    "format": "int32"
                },
                "userId": {
                    "type": "string"
                }
            },
            "required": [
                "companyId",
                "serviceName",
                "serviceAmount",
                "hasTax",
                "userId"
            ]
        },
        "AddOrUpdateRequest": {
            "title": "AddOrUpdateRequest",
            "example": {
                "pricingId": 5,
                "services": [
                    {
                        "id": 1,
                        "amount": 12
                    },
                    {
                        "id": 2,
                        "amount": 12
                    }
                ],
                "userId": "1"
            },
            "type": "object",
            "properties": {
                "pricingId": {
                    "type": "integer",
                    "format": "int32"
                },
                "services": {
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/Service"
                    }
                },
                "userId": {
                    "type": "string"
                }
            },
            "required": [
                "pricingId",
                "services",
                "userId"
            ]
        },
        "Service": {
            "title": "Service",
            "example": {
                "id": 1,
                "amount": 12
            },
            "type": "object",
            "properties": {
                "id": {
                    "type": "integer",
                    "format": "int32"
                },
                "amount": {
                    "type": "integer",
                    "format": "int32"
                }
            },
            "required": [
                "id",
                "amount"
            ]
        },
        "AddRequest7": {
            "title": "AddRequest7",
            "example": {
                "companyId": 1,
                "taxName": "LSD",
                "taxPercentage": 10,
                "userId": "1"
            },
            "type": "object",
            "properties": {
                "companyId": {
                    "type": "integer",
                    "format": "int32"
                },
                "taxName": {
                    "type": "string"
                },
                "taxPercentage": {
                    "type": "integer",
                    "format": "int32"
                },
                "userId": {
                    "type": "string"
                }
            },
            "required": [
                "companyId",
                "taxName",
                "taxPercentage",
                "userId"
            ]
        },
        "UpdateRequest7": {
            "title": "UpdateRequest7",
            "example": {
                "companyId": 1,
                "taxName": "LSD",
                "taxPercentage": 10,
                "userId": "1"
            },
            "type": "object",
            "properties": {
                "companyId": {
                    "type": "integer",
                    "format": "int32"
                },
                "taxName": {
                    "type": "string"
                },
                "taxPercentage": {
                    "type": "integer",
                    "format": "int32"
                },
                "userId": {
                    "type": "string"
                }
            },
            "required": [
                "companyId",
                "taxName",
                "taxPercentage",
                "userId"
            ]
        },
        "AddOrUpdateRequest1": {
            "title": "AddOrUpdateRequest1",
            "example": {
                "pricingId": 5,
                "taxes": [
                    {
                        "id": 1,
                        "percentage": 12
                    },
                    {
                        "id": 2,
                        "percentage": 12
                    }
                ],
                "userId": "1"
            },
            "type": "object",
            "properties": {
                "pricingId": {
                    "type": "integer",
                    "format": "int32"
                },
                "taxes": {
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/Taxis"
                    }
                },
                "userId": {
                    "type": "string"
                }
            },
            "required": [
                "pricingId",
                "taxes",
                "userId"
            ]
        },
        "Taxis": {
            "title": "Taxis",
            "example": {
                "id": 1,
                "percentage": 12
            },
            "type": "object",
            "properties": {
                "id": {
                    "type": "integer",
                    "format": "int32"
                },
                "percentage": {
                    "type": "integer",
                    "format": "int32"
                }
            },
            "required": [
                "id",
                "percentage"
            ]
        },
        "UpdateStatusRequest9": {
            "title": "UpdateStatusRequest9",
            "example": {
                "status": 1,
                "updatedBy": "1"
            },
            "type": "object",
            "properties": {
                "status": {
                    "type": "integer",
                    "format": "int32"
                },
                "updatedBy": {
                    "type": "string"
                }
            },
            "required": [
                "status",
                "updatedBy"
            ]
        },
        "AddPricingMasterRequest": {
            "title": "AddPricingMasterRequest",
            "example": {
                "companyId": 1,
                "pricingTypeId": 2,
                "name": "test",
                "description": "Test",
                "baseAmount": 12,
                "cancellationAmount": 12,
                "waitingAmount": 34,
                "maximumAmount": 30,
                "userId": "1",
                "perKm": {
                    "km": "1",
                    "perKmAmount": "10"
                },
                "kmSlab": [
                    {
                        "fromKm": 1,
                        "toKm": 5,
                        "fare": 10
                    },
                    {
                        "fromKm": 6,
                        "toKm": 10,
                        "fare": 20
                    }
                ],
                "flatFare": {
                    "flatAmount": 1,
                    "typeId": 4
                },
                "services": [
                    {
                        "id": 1,
                        "amount": 12,
                        "isFlat": 1
                    },
                    {
                        "id": 2,
                        "amount": 12,
                        "isFlat": 1
                    }
                ],
                "taxes": [
                    {
                        "id": 1,
                        "percentage": 12
                    },
                    {
                        "id": 2,
                        "percentage": 12
                    }
                ],
                "hasPromoCode": 0
            },
            "type": "object",
            "properties": {
                "companyId": {
                    "type": "integer",
                    "format": "int32"
                },
                "pricingTypeId": {
                    "type": "integer",
                    "format": "int32"
                },
                "name": {
                    "type": "string"
                },
                "description": {
                    "type": "string"
                },
                "baseAmount": {
                    "type": "integer",
                    "format": "int32"
                },
                "cancellationAmount": {
                    "type": "integer",
                    "format": "int32"
                },
                "waitingAmount": {
                    "type": "integer",
                    "format": "int32"
                },
                "maximumAmount": {
                    "type": "integer",
                    "format": "int32"
                },
                "userId": {
                    "type": "string"
                },
                "perKm": {
                    "$ref": "#/definitions/PerKm"
                },
                "kmSlab": {
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/KmSlab"
                    }
                },
                "flatFare": {
                    "$ref": "#/definitions/FlatFare"
                },
                "services": {
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/Service1"
                    }
                },
                "taxes": {
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/Taxis"
                    }
                },
                "hasPromoCode": {
                    "type": "integer",
                    "format": "int32"
                }
            },
            "required": [
                "companyId",
                "pricingTypeId",
                "name",
                "description",
                "baseAmount",
                "cancellationAmount",
                "waitingAmount",
                "maximumAmount",
                "userId",
                "perKm",
                "kmSlab",
                "flatFare",
                "services",
                "taxes",
                "hasPromoCode"
            ]
        },
        "PerKm": {
            "title": "PerKm",
            "example": {
                "km": "1",
                "perKmAmount": "10"
            },
            "type": "object",
            "properties": {
                "km": {
                    "type": "string"
                },
                "perKmAmount": {
                    "type": "string"
                }
            },
            "required": [
                "km",
                "perKmAmount"
            ]
        },
        "FlatFare": {
            "title": "FlatFare",
            "example": {
                "flatAmount": 1,
                "typeId": 4
            },
            "type": "object",
            "properties": {
                "flatAmount": {
                    "type": "integer",
                    "format": "int32"
                },
                "typeId": {
                    "type": "integer",
                    "format": "int32"
                }
            },
            "required": [
                "flatAmount",
                "typeId"
            ]
        },
        "Service1": {
            "title": "Service1",
            "example": {
                "id": 1,
                "amount": 12,
                "isFlat": 1
            },
            "type": "object",
            "properties": {
                "id": {
                    "type": "integer",
                    "format": "int32"
                },
                "amount": {
                    "type": "integer",
                    "format": "int32"
                },
                "isFlat": {
                    "type": "integer",
                    "format": "int32"
                }
            },
            "required": [
                "id",
                "amount",
                "isFlat"
            ]
        },
        "UpdatePricingMasterRequest": {
            "title": "UpdatePricingMasterRequest",
            "example": {
                "companyId": 1,
                "pricingTypeId": 3,
                "name": "test",
                "description": "Test",
                "baseAmount": 12,
                "cancellationAmount": 12,
                "waitingAmount": 34,
                "maximumAmount": 30,
                "userId": "1",
                "perKm": {
                    "km": "1",
                    "perKmAmount": "12"
                },
                "kmSlab": [
                    {
                        "fromKm": 1,
                        "toKm": 5,
                        "fare": 10
                    },
                    {
                        "fromKm": 6,
                        "toKm": 10,
                        "fare": 20
                    }
                ],
                "flatFare": {
                    "flatAmount": 1,
                    "typeId": 4
                },
                "services": [
                    {
                        "id": 1,
                        "amount": 12,
                        "isFlat": 0
                    },
                    {
                        "id": 2,
                        "amount": 12,
                        "isFlat": 0
                    }
                ],
                "taxes": [
                    {
                        "id": 1,
                        "percentage": 12
                    }
                ],
                "hasPromoCode": 0
            },
            "type": "object",
            "properties": {
                "companyId": {
                    "type": "integer",
                    "format": "int32"
                },
                "pricingTypeId": {
                    "type": "integer",
                    "format": "int32"
                },
                "name": {
                    "type": "string"
                },
                "description": {
                    "type": "string"
                },
                "baseAmount": {
                    "type": "integer",
                    "format": "int32"
                },
                "cancellationAmount": {
                    "type": "integer",
                    "format": "int32"
                },
                "waitingAmount": {
                    "type": "integer",
                    "format": "int32"
                },
                "maximumAmount": {
                    "type": "integer",
                    "format": "int32"
                },
                "userId": {
                    "type": "string"
                },
                "perKm": {
                    "$ref": "#/definitions/PerKm"
                },
                "kmSlab": {
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/KmSlab"
                    }
                },
                "flatFare": {
                    "$ref": "#/definitions/FlatFare"
                },
                "services": {
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/Service1"
                    }
                },
                "taxes": {
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/Taxis"
                    }
                },
                "hasPromoCode": {
                    "type": "integer",
                    "format": "int32"
                }
            },
            "required": [
                "companyId",
                "pricingTypeId",
                "name",
                "description",
                "baseAmount",
                "cancellationAmount",
                "waitingAmount",
                "maximumAmount",
                "userId",
                "perKm",
                "kmSlab",
                "flatFare",
                "services",
                "taxes",
                "hasPromoCode"
            ]
        },
        "GetFareRequest": {
            "title": "GetFareRequest",
            "example": {
                "pricingId": 53,
                "odPairs": [
                    {
                        "stopO": "A",
                        "stopD": "B",
                        "km": 11.0,
                        "noOfStops": 1
                    },
                    {
                        "stopO": "B",
                        "stopD": "C",
                        "km": 8,
                        "noOfStops": 1
                    },
                    {
                        "stopO": "A",
                        "stopD": "C",
                        "km": 40,
                        "noOfStops": 2
                    }
                ]
            },
            "type": "object",
            "properties": {
                "pricingId": {
                    "type": "integer",
                    "format": "int32"
                },
                "odPairs": {
                    "type": "array",
                    "items": {
                        "$ref": "#/definitions/OdPair"
                    }
                }
            },
            "required": [
                "pricingId",
                "odPairs"
            ]
        },
        "OdPair": {
            "title": "OdPair",
            "example": {
                "stopO": "A",
                "stopD": "B",
                "km": 11.0,
                "noOfStops": 1
            },
            "type": "object",
            "properties": {
                "stopO": {
                    "type": "string"
                },
                "stopD": {
                    "type": "string"
                },
                "km": {
                    "type": "number",
                    "format": "double"
                },
                "noOfStops": {
                    "type": "integer",
                    "format": "int32"
                }
            },
            "required": [
                "stopO",
                "stopD",
                "km",
                "noOfStops"
            ]
        }
    },
    "tags": [
        {
            "name": "PRICING TYPES",
            "description": ""
        },
        {
            "name": "PRICING MASTER",
            "description": ""
        },
        {
            "name": "PRODUCT PRICING",
            "description": ""
        },
        {
            "name": "PER KM PRICING",
            "description": ""
        },
        {
            "name": "KM SLAB PRICING",
            "description": ""
        },
        {
            "name": "FLAT PRICING",
            "description": ""
        },
        {
            "name": "SERVICES",
            "description": ""
        },
        {
            "name": "SERVICE MAPPING",
            "description": ""
        },
        {
            "name": "TAXES",
            "description": ""
        },
        {
            "name": "TAX MAPPING",
            "description": ""
        },
        {
            "name": "APPLICATION LOGIC",
            "description": ""
        }
    ]
}