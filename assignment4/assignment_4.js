function DonutMaster() {
  this.stores = [];
  this.addShop = function (storeObj) {
    this.stores.push(storeObj);
  };
  this.generateReport = function () {
    document.write("<tbody>");
    for (var i = 0; i < this.stores.length; i++) {
      document.write("<tr>"); 
      document.write("<th scope=\"row\">" + this.stores[i].locName + "</th>");
      document.write("<td>" + this.stores[i].hoursPerDay + "</td>");
      document.write("<td>" + this.stores[i].custPerHour + "</td>");
      document.write("<td>" + this.stores[i].getDonutsPerHour() + "</td>");
      document.write("<td>" + this.stores[i].getDonutsPerDay() + "</td>");
      document.write("</tr>");
    }
    document.write("</tbody>");
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