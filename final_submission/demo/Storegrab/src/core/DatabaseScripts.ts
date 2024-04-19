const DatabaseScripts = {
  db: null,
  queries: [],
  alterQueries: [],
  init() {
    this.queries = [];
    this.alterQueries = [];
    this.queries.push({
      key: 'User',
      value: `CREATE TABLE IF NOT EXISTS User(userId TEXT primary key, emailId TEXT, userTypeId TEXT, 
        customerAssigned TEXT, firstName TEXT, lastName TEXT, password TEXT, lastSelectedLocation TEXT,eulaAccepted TEXT, lastLoginDateTime TEXT
        )`
    });
    this.queries.push({
      key: 'User UNIQUE INDEX',
      value: `CREATE UNIQUE INDEX idx_user_userId
      ON User (userId);`
    });
    this.queries.push({
      key: 'Locations',
      value: `CREATE TABLE IF NOT EXISTS Locations( customerId TEXT primary key,
        userId TEXT,
        name TEXT,
        address1 TEXT,
        address2 TEXT,
        state TEXT,
        city TEXT,
        zipcode TEXT,
        country TEXT,
        customerTypeId TEXT,
        emailId TEXT,
        opcoCustomerId TEXT,
        opcoId TEXT,
        commitmentTime TEXT,
        deliveryDays TEXT,
        orderDay TEXT,
        cutOffTime TEXT,
        shelfTagWithRtl TEXT,
        salesRepId TEXT,
        salesRepFirstName TEXT,
        salesRepLastName TEXT,
        opcoName TEXT
        )`
    });

    this.queries.push({
      key: 'Locations UNIQUE INDEX',
      value: `CREATE UNIQUE INDEX idx_Locations_customerId
      ON Locations (customerId);`
    });

    this.queries.push({
      key: 'Orders',
      value: `CREATE TABLE IF NOT EXISTS Orders(
        orderId TEXT primary key,
        opcoCustomerId TEXT,
        status TEXT,
        orderSentDateTime TEXT,
        confNumber TEXT,
        orderTypeId TEXT,
        customerPurchaseOrder TEXT,
        memo TEXT,
        netValue TEXT,
        totalLineItemCount TEXT,
        totalItemCount TEXT,
        totalCartonCount TEXT,
        totalLabelCount TEXT,
        totalBookingItemCount TEXT,
        newItemCount TEXT,
        lastUpdatedPlatform TEXT,
        isDeleted TEXT,
        orderDeletedDateTime TEXT,
        createdDeviceId TEXT,
        updatedDeviceId TEXT,
        createdBy TEXT,
        createdDateTime TEXT,
        updatedBy TEXT,
        updatedDateTime TEXT,
        inDeviceUpdatedDateTime TEXT
      )`
    });

    this.queries.push({
      key: 'Orders UNIQUE INDEX',
      value: `CREATE UNIQUE INDEX idx_Orders_orderId
      ON Orders (orderId);`
    });

    this.queries.push({
      key: 'OrderDetails',
      value: `CREATE TABLE IF NOT EXISTS OrderDetails(OrderId TEXT REFERENCES Orders(OrderId), 
        opcoCustomerId TEXT,
        orderItemId TEXT,
        shelfTag TEXT,
        opcoMaterialId TEXT,
        orderedQty TEXT,
        uom TEXT,
        cost TEXT,
        discount TEXT,
        retailPrice TEXT,
        materialModifiedDateTime TEXT,
        bookingFlag TEXT,
        returnable TEXT,
        orderReason TEXT,
        sourceOfEntry TEXT,
        erpRefOfOrder TEXT,
        createdDeviceId TEXT,
        updatedDeviceId TEXT,
        createdBy TEXT,
        createdDateTime TEXT,
        updatedBy TEXT,
        updatedDateTime TEXT,
        PRIMARY KEY (OrderId, opcoMaterialId, uom)
        )`
    });

    this.queries.push({
      key: 'OrderDetails UNIQUE INDEX',
      value: `CREATE UNIQUE INDEX idx_OrderDetails_OrderId_opcoCustomerId_opcoMaterialId_uom
      ON OrderDetails (OrderId, opcoCustomerId, opcoMaterialId, uom);`
    });

    this.queries.push({
      key: '',
      value: `CREATE TABLE IF NOT EXISTS ReferenceData(Id TEXT primary key,
        type TEXT,
        name TEXT,
        code TEXT,
        comments TEXT
        )`
    });

    this.queries.push({
      key: 'ReferenceData UNIQUE INDEX',
      value: `CREATE UNIQUE INDEX idx_ReferenceData_Id
      ON ReferenceData (Id);`
    });

    this.queries.push({
      key: 'Resources',
      value: `CREATE TABLE IF NOT EXISTS Resources(id TEXT primary key,
        name TEXT,
        typeId TEXT,
        validFromDate TEXT,
        validToDate TEXT,
        downloadUrl TEXT,
        createdBy TEXT,
        createdDateTime TEXT,
        updatedBy TEXT,
        updatedDateTime TEXT,
        inDeviceUpdatedDateTime TEXT
        )`
    });

    this.queries.push({
      key: 'Resources UNIQUE INDEX',
      value: `CREATE UNIQUE INDEX idx_Resources_id
      ON Resources (id);`
    });

    this.queries.push({
      key: 'ResourceDetails',
      value: `CREATE TABLE IF NOT EXISTS ResourceDetails(resourceId TEXT,
        lineNumber TEXT,
        itemName TEXT,
        imageType TEXT,
        validFromDate TEXT,
        validToDate TEXT,
        lineType TEXT,
        promo TEXT,
        shipDate TEXT,
        daysToLookBackForGAP TEXT,
        autoCheckForGAP TEXT,
        vendorName TEXT,
        url TEXT,
        createdBy TEXT,
        createdDateTime TEXT,
        updatedBy TEXT,
        updatedDateTime TEXT,
        PRIMARY KEY (resourceId, itemName)
        )`
    });

    this.queries.push({
      key: 'ResourceDetails UNIQUE INDEX',
      value: `CREATE UNIQUE INDEX idx_ResourceDetails_resourceId_itemName
      ON ResourceDetails (resourceId, itemName);`
    });
  },
  ExecuteQuery(sql, params): Promise<any> {
    return new Promise((resolve, reject) => {
      this.db.transaction(trans => {
        trans.executeSql(
          sql,
          params,
          (trans, results: any) => {
            resolve(results);
          },
          error => {
            reject(error);
          }
        );
      });
    });
  },

  async execute() {
    for (let i = 0; i < this.queries.length; i++) {
      const query = this.queries[i].value;
      this.db.executeSql(query);
      console.log('Table created ' + this.queries[i].key);
    }
  }
};
export default DatabaseScripts;
