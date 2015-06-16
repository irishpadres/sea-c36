function DonutMaster() {
  this.stores = [];
  this.addShop = function (storeObj) {
    this.stores.push(storeObj);
  };
  this.initialTable = function () {
    var mainRpt = '<div id="mainRpt" class="headerRow">';
    mainRpt += '<div class="cell">ID</div>';
    mainRpt += '<div class="cell">Location Name</div>';
    mainRpt += '<div class="cell">Hours in Operation</div>';
    mainRpt += '<div class="cell">Customers Per Hour</div>';
    mainRpt += '</div>';
    var xtraRpt = '<div id="xtraRpt" class="headerRow">';
    xtraRpt += '<div class="cell">Ave Donuts Per Hour</div>';
    xtraRpt += '<div class="cell">Total Donuts per Day</div>';
    xtraRpt += '</div>';
    for (var i = 0; i < this.stores.length; i++) {
      var storeID = i + 1;
      mainRpt += '<div class="row" id=mainRow' + storeID + '>';
      mainRpt += '<div class="cell storeID">' + storeID + '</div>';
      mainRpt += '<div class="cell locName">' + this.stores[i].locName + '</div>';
      mainRpt += '<div class="cell hoursPerDay">' + this.stores[i].hoursPerDay + '</div>';
      mainRpt += '<div class="cell custPerHour">' + this.stores[i].getCustPerHour() + '</div>';
      mainRpt += '</div>';
      xtraRpt += '<div class="row" id=xtraRow' + storeID + '>';
      xtraRpt += '<div class="cell donutsPerHour">' + this.stores[i].getDonutsPerHour() + '</div>';
      xtraRpt += '<div class="cell donutsPerDay">' + this.stores[i].getDonutsPerDay() + '</div>';
      xtraRpt += '</div>';
    }
    $('#mainReportTable').append(mainRpt)
    $('#xtraReportTable').append(xtraRpt)
  }
}

function DonutShop(name, minCust, maxCust, aveDonuts, hoursOfOp) {
  this.locName = name;
  this.minCust = minCust;
  this.maxCust = maxCust;
  this.aveDonutsPerCust = aveDonuts;
  this.hoursPerDay = hoursOfOp;
  this.getCustPerHour = function() {
    return Math.round(Math.random() * (maxCust - minCust) + minCust);
  };
  this.getDonutsPerHour = function () {
    return Math.round(this.getCustPerHour() / this.aveDonutsPerCust);
  };
  this.getDonutsPerDay = function () {
    return Math.round(this.getDonutsPerHour() * this.hoursPerDay); 
  };
}
 
var donutMasterObj = new DonutMaster();
 
donutMasterObj.addShop(new DonutShop("Downtown", 8, 43, 4.50, 8));
donutMasterObj.addShop(new DonutShop("Capital Hill", 4, 37, 2.00, 10));
donutMasterObj.addShop(new DonutShop("South Lake Union", 9, 23, 6.33, 12));
donutMasterObj.addShop(new DonutShop("Wedgewood", 2, 28, 1.25, 10));
donutMasterObj.addShop(new DonutShop("Ballard", 8, 58, 3.75, 12));

donutMasterObj.initialTable();
//donutMasterObj.generateReport();

var target = $('#mainReportTable .locName')
$(target).click(function() {
  var index = $(target).index(this);
  $('#xtraReportTable .row:eq(' + index + ')').toggleClass('show');
  console.log($("#xtraReportTable > div.row.show").length);
  if ($("#xtraReportTable > div.row.show").length === 0) {
    $('#xtraReportTable .headerRow').removeClass('show');
  } else {
    $('#xtraReportTable .headerRow').addClass('show');
  };
});
