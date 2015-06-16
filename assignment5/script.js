function DonutMaster() {
  this.stores = [];
  this.addShop = function (storeObj) {
    this.stores.push(storeObj);
  };
  this.generateReport = function () {
    var table = document.getElementById("reportTable");
    for (var i = 0; i < this.stores.length; i++) {
      var row = table.insertRow(i + 1);
      var cellLoc = row.insertCell(0);
      var cellHours = row.insertCell(1);
      var cellCustPerHour = row.insertCell(2);
      var cellDonutsPerHour = row.insertCell(3);
      var cellDonutsPerDay = row.insertCell(4);
      cellLoc.innerHTML = this.stores[i].locName;
      cellHours.innerHTML = this.stores[i].hoursPerDay;
      cellCustPerHour.innerHTML = this.stores[i].custPerHour;
      cellDonutsPerHour.innerHTML = this.stores[i].getDonutsPerHour();
      cellDonutsPerDay.innerHTML = this.stores[i].getDonutsPerDay();
      cellLoc.className = "header"
      cellHours.className = "data";
      cellCustPerHour.className = "data";
      cellDonutsPerHour.className = "data";
      cellDonutsPerDay.className = "data";
    }
  };
} 
  
function DonutShop(name, minCust, maxCust, aveDonuts, hoursOfOp) {
  this.locName = name;
  this.minCust = minCust;
  this.maxCust = maxCust;
  this.aveDonutsPerCust = aveDonuts;
  this.hoursPerDay = hoursOfOp;
  this.custPerHour = Math.round(Math.random() * (maxCust - minCust) + minCust);
  this.getDonutsPerHour = function () {
    return Math.round(this.custPerHour / this.aveDonutsPerCust);
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
 
donutMasterObj.generateReport();