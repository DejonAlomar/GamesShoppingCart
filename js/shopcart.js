function CheckBrowser() {
        if ('localStorage' in window &&['localStorage'] !== null){
            //local storage is available
            return true;
        } else {
            return false;
        }
    }

var shippy = 10;
var pricy = 0;
var cart = [];
if (localStorage.length === 0) {
    var item = {id: 'XD01', name: 'Nintendo Wiiu', price: '200', quantity: '1', total: '200'};
    cart.push(item);
    removeAll(); 
    saveItem();
    doShowAll();
   
}

function additem(oid, oname, oprice, oquantity) {
   window.alert('Added one\(1\) to cart!');
   var inside = false;
    var num;
   /*for (i in cart) {
        inside = (cart[i].id == oid) 
        //console.log(inside);
   }*/
    
     for (var i = 0; i <= cart.length - 1; i++) {
      if (cart[i].id === oid){
          inside = true;
          num = i;
          break;
      }   
     }
        if (inside == true) {
            plusQ(num);
           
       }
        if (inside == false) {
        var item = {id: oid, name: oname, price: oprice, quantity: oquantity, total: oprice};
        cart.push(item);
        saveItem();
        doShowAll();
       }
    }   


function doShowAll() {
        
        if (CheckBrowser()) {
            retItem();
            var list = "<tr><th>Id</th><th>Name</th><th>Price</th><th>Quantity</th><th>Subtotal</th><th>Remove</th></tr>\n";
            var i = 0;
            for (i = 0; i <= cart.length - 1; i++) {
                //key = localStorage.key(i);
                list += "<tr><td>" + cart[i].id + "</td>\n<td>" + cart[i].name + "</td>\n<td>$" + cart[i].price + "</td>\n<td style=\"text-align: right;\"><input name=qtyUp id=qtyUp onclick=\"plusQ("+i+")\" type=button value=\"↑\">&nbsp;&nbsp;"+ cart[i].quantity + "&nbsp;&nbsp;<input name=qtyDown onclick=\"minusQ("+i+")\" id=qtyDown type=button value=\"↓\"></td>\n<td>$" + cart[i].total + "</td>\n<td><input name=modify type=button value=\"X\" onclick=\"removeItem(" + i + ")\"></td></tr>\n";    
            }
            
            if (cart.length < 1) {
                list += "<tr><td colspan=\"5\"><i>You have not ordered anything yet!</i></td></tr>\n"
            }
            else {
                list += "<tr><td colspan=\"5\" style=\"text-align: right;\">Total Price: $" + getTotal() +"</td></tr>\n";
            }
            
            if (document.getElementById('shipping')) {
                if (document.getElementById('shipping').checked) {
                    list += "<tr><td colspan=\"3\" style=\"text-align: right;\">Fast Shipping</td>\n<td style=\"text-align: right;\"> + $" + shippy + " </td></tr>\n<tr><td colspan=\"3\" style=\"text-align: right;\">Final Total</td>\n<td style=\"text-align: right;\"> $" + addFinal() + " </td></tr>\n";
                }
            }
          
            document.getElementById('list').innerHTML = list;
            
        }else {
            alert('Sorry, your browser does not support local storage.');
        }
    }



function saveItem() {
localStorage.setItem('shopcart',JSON.stringify(cart));
}

function retItem() {
    cart = JSON.parse(localStorage.getItem('shopcart'));
}

function getTotal() {
    var ototal = 0;
    for (i = 0; i <= cart.length - 1; i++) {
                ototal += parseInt(cart[i].total,10);  
            }
    pricy = ototal;
    return ototal;
}

function removeItem(i) {
    cart.splice(i,1);
    saveItem();
    doShowAll();
}

function removeAll() {
    cart.length = 0;
    saveItem();
    doShowAll();
}

function checkoutCheck() {
    if (cart.length < 1) {
        alert('There\'s nothing in your cart to checkout!');
        alert('Redirecting back to a product page.');
        window.location.href = 'games.html';
    }
    else {
        window.location.href = 'shipping.html';
    }
}

function removeAsk() {
    if (window.confirm('Are you sure you empty your cart?')) {
    removeAll();
    window.alert('Moving back to a products page.');
    window.location.href = 'games.html';   
 }
}

function qNumber(i) {
    var qty = parseInt(cart[i].quantity);
    var tot = parseInt(cart[i].price);
            tot = tot * qty;
            cart[i].total = tot;
}

function plusQ(i) {
    var qty = parseInt(cart[i].quantity);
            qty += 1;
            cart[i].quantity = qty;
            qNumber(i);
            saveItem();
            doShowAll();
}

function minusQ(i) {
    var qty = parseInt(cart[i].quantity);
    if (qty > 0){
            qty -= 1;
            if (qty > 0){
                cart[i].quantity = qty;
                qNumber(i);
                saveItem();
                doShowAll();
            }
            else {
                cart[i].quantity = 1;
                saveItem();
                doShowAll();
            }
    }
    else{
        removeItem();
    }
}

function addFinal() {
    var final = pricy + shippy;
    return final;
}

function checkFinal() {
   if (cart.length > 0) {
        if (window.confirm('Are you sure you want to check out?'))
        {
            window.location.href = 'thanks.html';
            removeAll();
        }
            else{
                alert("Think slowly and decide.");
            }
   }
else {
    checkoutCheck();
}
}

