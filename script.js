// GLOBAL
var pName = document.getElementById("ProductName");
var pPrice = document.getElementById("ProductPrice");
var pCategory = document.getElementById("ProductCategory");
var pImage = document.getElementById("ProductImage");
var pDescreption = document.getElementById("ProductDescreption");
var pSearch = document.getElementById("ProductSearch");

// LOCAL STORAgE
if (localStorage.getItem('product') !== null) {
    pList = JSON.parse(localStorage.getItem('product'))
    displayProduct()
} else {
    var pList = [];
}

// ADD
var btn = document.getElementById("Add");
btn.onclick = addProduct;
function addProduct() {
    if (productNameValidation() && productPriceValidation() && productCategoryValidation() && productDescriptionValidation() && productImageValidation()) {
        var product = {
            Name: pName.value.trim(),
            Price: pPrice.value,
            Category: pCategory.value.trim(),
            Image: pImage.files[0] ? `./images/${pImage.files[0]?.name}` : "./images/hero img.jpg",
            Descreption: pDescreption.value.trim(),
        }
        if (document.getElementById('Add').innerHTML === 'Add Product') {
            pList.push(product)
        } else {
            pList.splice(currentIndex, 1, product)
            document.getElementById('Add').innerHTML = 'Add Product'
        }
        localStorage.setItem('product', JSON.stringify(pList))
        displayProduct()
        clearProduct()
    }
}

// DISPLAY
function displayProduct() {
    var cartona = ``;
    for (var i = 0; i < pList.length; i++) {
        cartona += `<div class="col-md-12 col-lg-3">
                <div>
                    <img src="${pList[i].Image}" class="w-100" alt="${pList[i].Image}">
                    <p><strong>Name : </strong>${pList[i].Name}</p>
                    <p><strong>Price : </strong>${pList[i].Price}</p>
                    <p><strong>Category : </strong>${pList[i].Category}</p>
                    <p><strong>Descreption : </strong>${pList[i].Descreption}</p>
                </div>
                <div class="text-center">
                <button onclick="deleteProduct(${i})" class="btn btn-outline-danger my-3 w-75">Delete<i class="fa fa-trash mx-2"></i></button>
                <button onclick="updateProduct(${i})" class="btn btn-outline-warning w-75">Update<i class="fa fa-edit mx-2"></i></button>
                </div>
                    </div>`
    }
    document.getElementById("rowBody").innerHTML = cartona
}

// CLEAR
function clearProduct() {
    pName.value = null
    pPrice.value = null
    pCategory.value = null
    pImage.value = null
    pDescreption.value = null
    pName.classList.remove("is-valid")
    pPrice.classList.remove("is-valid")
    pCategory.classList.remove("is-valid")
    pImage.classList.remove("is-valid")
    pDescreption.classList.remove("is-valid")
}

// DELETE
function deleteProduct(index) {
    pList.splice(index, 1)
    localStorage.setItem('product', JSON.stringify(pList))
    displayProduct()
}

// UPDATE
var currentIndex;
function updateProduct(index) {
    currentIndex = index;
    pName.value = pList[index].Name
    pPrice.value = pList[index].Price
    pCategory.value = pList[index].Category
    pDescreption.value = pList[index].Descreption
    document.getElementById('Add').innerHTML = 'update Product'
}

// SEARCH
function searchProduct() {
    var searchValue = pSearch.value
    var cartona = ''
    for (i = 0; i < pList.length; i++) {
        if (pList[i].Name.toLowerCase().includes(searchValue.toLowerCase()) == true) {
            cartona += `<div class="col-md-12 col-lg-3">
            <div>
                <img src="${pList[i].Image}" class="w-100" alt="${pList[i].Image}">
                <p><strong>Name : </strong>${pList[i].Name.replace(searchValue.toLowerCase(), `<span class="text-success">${searchValue}</span>`)}</p>
                <p><strong>Price : </strong>${pList[i].Price}</p>
                <p><strong>Category : </strong>${pList[i].Category}</p>
                <p><strong>Descreption : </strong>${pList[i].Descreption}</p>
            </div>
            <div class="text-center">
            <button onclick="deleteProduct(${i})" class="btn btn-outline-danger my-3 w-75">Delete<i class="fa fa-trash mx-2"></i></button>
            <button onclick="updateProduct(${i})" class="btn btn-outline-warning w-75">Update<i class="fa fa-edit mx-2"></i></button>
            </div>
                </div>`
        }
    }
    document.getElementById("rowBody").innerHTML = cartona
}

// VALIDATION NAME
function productNameValidation() {
    var messageName = document.getElementById('msgName')
    var regex = /^[a-zA-Z][a-zA-Z0-9]{2,19}$/
    var textName = pName.value.trim()
    if (regex.test(textName)) {
        pName.classList.add('is-valid')
        pName.classList.remove('is-invalid')
        messageName.classList.add('d-none')
        return true
    } else {
        pName.classList.remove('is-valid')
        pName.classList.add('is-invalid')
        messageName.classList.remove('d-none')
        return false
    }
}

// VALIDATION PRICE
function productPriceValidation() {
    var messagePrice = document.getElementById('msgPrice')
    var regex = /^\d{1,10}(\.\d{1,2})?$/
    var textPrice = pPrice.value
    if (regex.test(textPrice)) {
        pPrice.classList.add('is-valid')
        pPrice.classList.remove('is-invalid')
        messagePrice.classList.add('d-none')
        return true
    } else {
        pPrice.classList.remove('is-valid')
        pPrice.classList.add('is-invalid')
        messagePrice.classList.remove('d-none')
        return false
    }
}

// VALIDATION CATEGORY
function productCategoryValidation() {
    var messageCategory = document.getElementById('msgCategory')
    var regex = /^(tv|pc|tablits|mobiles|electorinces)$/i
    var textCategory = pCategory.value
    if (regex.test(textCategory)) {
        pCategory.classList.add('is-valid')
        pCategory.classList.remove('is-invalid')
        messageCategory.classList.add('d-none')
        return true
    } else {
        pCategory.classList.remove('is-valid')
        pCategory.classList.add('is-invalid')
        messageCategory.classList.remove('d-none')
        return false
    }
}

// VALIDATION DESCRIPTION
function productDescriptionValidation() {
    var messageDescription = document.getElementById('msgDescription')
    var regex = /^.{3,}$/m
    var textDescription = pDescreption.value
    if (regex.test(textDescription)) {
        pDescreption.classList.add('is-valid')
        pDescreption.classList.remove('is-invalid')
        messageDescription.classList.add('d-none')
        return true
    } else {
        pDescreption.classList.remove('is-valid')
        pDescreption.classList.add('is-invalid')
        messageDescription.classList.remove('d-none')
        return false
    }
}

// VALIDATION IMAGE
function productImageValidation() {
    var messageImage = document.getElementById('msgImage')
    var regex = /^.{1,}\.(jpg|png|avif|jpeg|svg)$/
    var textImage = pImage.value
    if (regex.test(textImage)) {
        pImage.classList.add('is-valid')
        pImage.classList.remove('is-invalid')
        messageImage.classList.add('d-none')
        return true
    } else {
        pImage.classList.remove('is-valid')
        pImage.classList.add('is-invalid')
        messageImage.classList.remove('d-none')
        return false
    }
}