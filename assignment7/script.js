// Master object with all store details
function DonutMaster() {
  this.stores = []; // array of stores
  // Put the created store objects into stores array
  this.addShop = function(storeObj) {
    this.stores.push(storeObj);
  };
  // Generate all the HTML to build the table on initial values
  this.initialTable = function() {
    // Header row
    var mainRpt = '<div class="row header" id="mainRpt">';
    mainRpt += '<div class="cell storeID">ID</div>';
    mainRpt += '<div class="cell locName">Location Name</div>';
    mainRpt += '<div class="cell hoursPerDay">Hours in Operation</div>';
    mainRpt += '<div class="cell aveDntsPerCust">Ave Donuts Per Customer</div>';
    mainRpt += '<div class="cell custPerHour">Customers Per Hour</div>';
    mainRpt += '<div class="cell donutsPerHour">Ave Donuts Per Hour</div>';
    mainRpt += '<div class="cell dountsPerDay">Total Donuts per Day</div>';
    mainRpt += '</div>';
    // Go through each store and build the rows
    for (var i = 0; i < this.stores.length; i++) {
      // initial values
      var storeID = i + 1;
      var custPerHour = this.stores[i].getCustPerHour();
      var donutsPerHour = this.stores[i].getDonutsPerHour();
      var donutsPerDay = this.stores[i].getDonutsPerDay();

      // row div
      mainRpt += '<div class="row data" id=mainRow' + storeID + '>';
      // store id cell
      mainRpt += '<div class="cell storeID">' + storeID + '</div>';
      // store name cell
      mainRpt += '<div class="cell locName">' + this.stores[i].locName + '</div>';
      // hours open with hidden input boxes
      mainRpt += '<div class="cell hoursPerDay">' + '<form>' +
        '<input name="hoursPerDay" class="txtBox" type="textbox" value="' +
        this.stores[i].hoursPerDay + '" id="hoursPerDay' + i + '" style="display:none;" />' +
        '<span class="txtBoxValue" id="hoursPerDay' + i + '">' + 
        this.stores[i].hoursPerDay + '</span>' + 
        '<button class="button" id="btn' + i + '" style="display:none">' + 'OK' +
        '</button>' + '</form>' + '</div>';
      // Average donuts per customer with hidden input boxes
      mainRpt += '<div class="cell aveDntsPerCust">' + '<form>' +
        '<input name="aveDntsPerCust" class="txtBox" type="textbox" value="' +
        this.stores[i].aveDntsPerCust + '" id="aveDntsPerCust' + i + '" style="display:none;" />' +
        '<span class="txtBoxValue" id="aveDntsPerCust' + i + '">' + 
        this.stores[i].aveDntsPerCust + '</span>' + 
        '<button class="button" id="btn' + i + '" style="display:none">' + 'OK' + 
        '</button>' + '</form>' + '</div>';
      // Customer per hour with hidden boxes to change min and max of random values
      mainRpt += '<div class="cell custPerHour">' + '<form>' +
        '<input name="minCust" class="txtBox" type="textbox" value="' +
        this.stores[i].minCust + '" id="minCust' + i + '" style="display:none;" />' +
        '<input name="maxCust" class="txtBox" type="textbox" value="' +
        this.stores[i].maxCust + '" id="maxCust' + i + '" style="display:none;" />' +
        '<span class="txtBoxValue" id="custPerHour' + i + '">' + custPerHour + '</span>' +
        '<button class="button" id="btn' + i + '" style="display:none">' + 'OK' +
        '</button>' + '</form>' + '</div>';
      // Donuts per hour cell
      mainRpt += '<div class="cell donutsPerHour">' + 
        '<span class="txtBoxValue" id="donutsPerHour' + i + '">' + 
        donutsPerHour + '</span></div>';
      // Donuts in a day cell
      mainRpt += '<div class="cell donutsPerDay">' + 
        '<span class="txtBoxValue" id="donutsPerDay' + i + '">' + 
        donutsPerDay + '</span></div>';
      mainRpt += '</div>';
    }
    // Add the HTML to the document
    $('#mainReportTable').append(mainRpt);
  }
}

// Store constructor
function DonutShop(name, minCust, maxCust, aveDonuts, hoursOfOp) {
  this.locName = name; // store name
  this.minCust = minCust; // minimum number of customers
  this.maxCust = maxCust; // maximm number of customers
  this.aveDntsPerCust = aveDonuts; // average number of donuts per customer
  this.hoursPerDay = hoursOfOp; // number of hours open in a day
  this.randomVal = Math.random();  // Don't want random value changing with each call
  this.getCustPerHour = function() {  // Get random number of customers
    return Math.round(this.randomVal * (maxCust - minCust) + minCust);
  };
  this.getDonutsPerHour = function() { // Calculate donuts per hour
    return Math.round(this.getCustPerHour() * this.aveDntsPerCust);
  };
  this.getDonutsPerDay = function() { // Calculate donuts per day
    return Math.round(this.getDonutsPerHour() * this.hoursPerDay);
  };
} 

// Update the HTML table with new values
function updateValues(storeObj, i) {
  $('#hoursPerDay' + i + '.txtBoxValue').text(storeObj.hoursPerDay);
  $('#aveDntsPerCust' + i + '.txtBoxValue').text(storeObj.aveDntsPerCust);
  $('#custPerHour' + i + '.txtBoxValue').text(storeObj.getCustPerHour());
  $('#donutsPerHour' + i + '.txtBoxValue').text(storeObj.getDonutsPerHour());
  $('#donutsPerDay' + i + '.txtBoxValue').text(storeObj.getDonutsPerDay());
}
// End of functions and constructors


// Define each initial store data
var donutMasterObj = new DonutMaster(); 
donutMasterObj.addShop(new DonutShop("Downtown", 8, 43, 4.50, 8));
donutMasterObj.addShop(new DonutShop("Capital Hill", 4, 37, 2.00, 10));
donutMasterObj.addShop(new DonutShop("South Lake Union", 9, 23, 6.33, 12));
donutMasterObj.addShop(new DonutShop("Wedgewood", 2, 28, 1.25, 10));
donutMasterObj.addShop(new DonutShop("Ballard", 8, 58, 3.75, 12));

// Create initial table
donutMasterObj.initialTable();

// jQuery to control visibility
$('span.txtBoxValue').on('click', function() {
  $(this).hide();
  $(this).siblings('.txtBox').show();
  $(this).siblings('.button').show();
});

// Update values on button click
$(':button').click(function(event) {
  var btnThis = this;
  event.preventDefault();

  // First, get the id of the specific button pushed
  var buttonID = $(btnThis).attr("id");
  // Get the 'i' value off the end to reference the store array
  var i = buttonID.substr(3);
  // Initialize the obj of the specific store
  var obj = donutMasterObj.stores[i];
  // Go through each input value
  $(btnThis).siblings('input').each(function() {
    // Get the target value to update
    var target = $(this).attr("id").slice(0, -1);
    // Get the new value submitted in the form
    var value = Number($('#' + target + i).val());
    // Output some debug info
    console.log('buttonID: ' + buttonID + ',',
      'i: ' + i + ',',
      'target var: ' + target + ',',
      'old value: ' + obj[target] + ',',
      'new value: ' + value
    );
    // Set the new value
    obj[target] = value;
  });
  
  // Update 'em
  updateValues(obj, i);

  // Reset visibility back to normal
  $(btnThis).siblings('span').show();
  $(btnThis).siblings('input').hide();
  $(btnThis).hide();
});

