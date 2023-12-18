let bdyCon = document.querySelector('body')

let titleCon = document.createElement('div')
titleCon.classList.add('titleCont')

let titleEle = document.createElement('h1')
titleEle.innerText = "Beautify.me"
titleCon.append(titleEle)

let subTit = document.createElement('p')
subTit.innerText = "One stop destination for your beauty needs"
titleCon.append(subTit)

bdyCon.append(titleCon)

async function makeup(){
    var A = fetch('https://makeup-api.herokuapp.com/api/v1/products.json')
    var B = await A
    var C = B.json()
    var out = await C

    let brandArr = []
    let b = {}
    

    let formCon = document.createElement('div')
    formCon.classList.add('formCont')

    let formEle = document.createElement('form')
    formEle.classList.add('search-form')
    formEle.setAttribute('action',"submit")

    let selEle = document.createElement('select')
    selEle.classList.add('form-select')

    for(let det of out){
        brandArr.push(det.brand)
    }
    for(let i of brandArr){
        if(b[i]){
         b[i]=b[i]+1
        }
        else{
            b[i]=1
        }
    }

    let optDef = document.createElement('option')
    optDef.setAttribute('value','')
    optDef.innerText = "Select Brand(click for available brands)"
    selEle.append(optDef)

    for(let comp of Object.keys(b)){
        let optEle = document.createElement('option')
        optEle.setAttribute('value',`${comp}`)
        optEle.innerText = `${comp}`
        selEle.append(optEle)
    }

    let butEle = document.createElement('button')
    butEle.setAttribute('type',"submit")
    butEle.innerText = "search"
    butEle.classList.add("btn")
    butEle.classList.add("btn-primary")

    formEle.append(selEle)
    formEle.append(butEle)
    formCon.append(formEle)
    bdyCon.append(formCon)

    let formDer = document.querySelector('.search-form')
    let selDer = document.querySelector('.form-select')

    let mainPar = document.createElement('div')
    mainPar.classList.add('main-parent')

    function createPage(data){
        let parCon = document.createElement('div')
        parCon.classList.add("parent")
     
        let brandName = document.createElement('p')
        let brandBold = document.createElement('b')
        brandBold.innerText = `${data.brand}`
        brandName.append(brandBold)
        parCon.append(brandName)
     
        let productName = document.createElement('p')
        productName.innerText = `Product : ${data.name}`
        parCon.append(productName)
     
        let priceName = document.createElement('p')
        priceName.innerText = `Price : ${data.price} USD`
        parCon.append(priceName)
        
        let imageName = document.createElement('img')
        try{
            async function imge(){
                const response = await fetch(`${data.image_link}`)
                if(response.ok){
                imageName.setAttribute('src',data.image_link)
                parCon.append(imageName)
                }
            }
            imge()
        }
        catch(err){
            imageName.remove()
        }
    
        let brk = document.createElement('br')
        parCon.append(brk)
     
         let productLink = document.createElement('a')
         productLink.setAttribute('href',data.product_link)
         productLink.innerText = `${data.name} - Link`
         parCon.append(productLink)
     
         let Description = document.createElement('p')
         Description.innerText = `${data.description}`
         Description.classList.add('des')
         parCon.append(Description)
     
         mainPar.append(parCon)
         bdyCon.append(mainPar)
    }

    for(let prim of out){
        createPage(prim)
    }
    
    formDer.addEventListener('submit',(e)=>{
        e.preventDefault()

        mainPar.innerText = ''

        for(let data of out){
            if(data.brand==selDer.value){
                createPage(data)
            }
            else if(selDer.value == ''){
                createPage(data)
            }
           }
    })
}
   
makeup()
