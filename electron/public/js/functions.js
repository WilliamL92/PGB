const tileWidth = 16

let projectData = {
    libraryMedia: {tab:[], currentId: 0},
    properties: {tab:[], currentId: 0},
    sceneObject: {tab:[], currentId: 0},
}

let spritesSelected = []

let canvasType = "none"

let tilesetDrag = "none"

Array.prototype.findObjectById = function(id){
    let res = -1
    for(let i = 0; i < this.valueOf().length; i++){
        if(this.valueOf()[i].id == id){
            res = i
        }
    }
    return res
}

function getImageDimensions(file){
    return new Promise (function (resolved, rejected) {
        const i = new Image()
        i.onload = function(){
        resolved({width: i.width, height: i.height})
        }
        i.src = file
    })
}

function getTileSet(image, func){
    const _stage = new Konva.Stage({
        container: `_temporaryCanvas`,
        width: tileWidth,
        height: tileWidth,
    })
    const _layer = new Konva.Layer()
    const imageObj = new Image()
    imageObj.onload = function () {
        const _tile = new Konva.Image({
        x: 0,
        y: 0,
        image: imageObj,
        })
        _layer.add(_tile)
        _layer.draw()
        let _lengthWidth = _tile.width()/tileWidth
        let _lengthHeight = _tile.height()/tileWidth

        if(_tile.width() < tileWidth){
            _lengthWidth = 1
        }
        if(_tile.height() < tileWidth){
            _lengthHeight = 1
        }
        const arr = []
        for(let p = 0; p < _lengthHeight; p++){
            arr.push([])
            const _index = arr.length - 1
            for(let n = 0; n < _lengthWidth; n++){
                const dataURL = _stage.toDataURL()
                arr[_index].push(dataURL)
                _tile.x(_tile.x() - tileWidth)
                _layer.draw()
            }
            _tile.y(_tile.y() - tileWidth)
            _tile.x(0)
            _layer.draw()
        }
        func(arr)
        $('#_temporaryCanvas').children().remove()
    }
    imageObj.src = image
    _stage.add(_layer)
}

function combineTileset(tab, func){
    const _stage = new Konva.Stage({
        container: `_temporaryCanvas`,
        width: tileWidth * tab[0].length,
        height: tileWidth * tab.length,
    })

    const _layer = new Konva.Layer()
    _stage.add(_layer)
    let count = 0
    for(let p = 0; p < tab.length; p++){
        for(let n = 0; n < tab[p].length; n++){
            const imageObj = new Image()

            imageObj.onload = function () {
                count++
                const _tile = new Konva.Image({
                    x: n*tileWidth,
                    y: p*tileWidth,
                    image: imageObj,
                })

                _layer.add(_tile)
                if(count == tab.length * tab[p].length){
                    _layer.draw()
                    const dataURL = _stage.toDataURL()
                    func(dataURL)
                    $('#_temporaryCanvas').children().remove()
                }

            }
            imageObj.src = tab[p][n]
        }
    }
}

function showTileSet(obj){
    
}

function loadDataProject(tab){
    //LOAD BIBLIOTHEQUE MEDIA
    $('#media-content').children().remove()
    for(let y = 0; y < tab.libraryMedia.tab.length; y++){
        combineTileset(tab.libraryMedia.tab[y].data, (img)=>{
            getImageDimensions(img).then((_dimensions)=>{
                if(_dimensions.width >= _dimensions.height){
                    $('#media-content').append(`<div id="BIBLI_MEDIA_ID_${tab.libraryMedia.tab[y].id}" class="link-focus bibliSelect" style="width: 110px; height: 110px; position: relative;"><img width="70" src="${img}" draggable="false"></img><p style="position: absolute; left: 0; bottom: 0;">${tab.libraryMedia.tab[y].name}</p></div>`)
                }
                else{
                    $('#media-content').append(`<div id="BIBLI_MEDIA_ID_${tab.libraryMedia.tab[y].id}" class="link-focus bibliSelect" style="width: 110px; height: 110px; position: relative;"><img height="70" src="${img}" draggable="false"></img><p style="position: absolute; left: 0; bottom: 0;">${tab.libraryMedia.tab[y].name}</p></div>`)
                }
                if(y == tab.libraryMedia.tab.length - 1){
                    $('.bibliSelect').off('click')
                    $('.bibliSelect').on('click', (e)=>{
                        let _div = $(e.target)
                        if($(e.target).get(0).tagName != "DIV"){
                            _div = $(e.target).parent()
                        }
                        const bibliId = _div.attr('id').substring(15, _div.attr('id').length)
                    })
                }
            })
        })
    }
}

function loadLibraryMedia(libraryMedia){
    $('#media-content').children().remove()
    for(let y = 0; y < libraryMedia.tab.length; y++){
        combineTileset(libraryMedia.tab[y].data, (img)=>{
            getImageDimensions(img).then((_dimensions)=>{
                if(_dimensions.width >= _dimensions.height){
                    $('#media-content').append(`<div id="BIBLI_MEDIA_ID_${libraryMedia.tab[y].id}" class="link-focus bibliSelect" style="width: 110px; height: 110px; position: relative;"><img width="70" src="${img}" draggable="false"></img><p style="position: absolute; left: 0; bottom: 0;">${libraryMedia.tab[y].name}</p></div>`)
                }
                else{
                    $('#media-content').append(`<div id="BIBLI_MEDIA_ID_${libraryMedia.tab[y].id}" class="link-focus bibliSelect" style="width: 110px; height: 110px; position: relative;"><img height="70" src="${img}" draggable="false"></img><p style="position: absolute; left: 0; bottom: 0;">${libraryMedia.tab[y].name}</p></div>`)
                }
                if(y == libraryMedia.tab.length - 1){
                    $('.bibliSelect').off('click')
                    $('.bibliSelect').on('click', (e)=>{
                        let _div = $(e.target)
                        if($(e.target).get(0).tagName != "DIV"){
                            _div = $(e.target).parent()
                        }
                        const bibliId = _div.attr('id').substring(15, _div.attr('id').length)
                        const _index = libraryMedia.tab.findObjectById(bibliId)
                        loadTileset(libraryMedia.tab[_index].data)
                    })
                }
            })
        })
    }
}

function gridCoord(data){
    let tab = []
    for(let i = 0; i <= (data.width/data.scale)/data.size + 1; i++){
        tab.push({
            x1: ((i*data.size - data.x/data.scale) + ((data.x/data.scale)%data.size)),
            y1: 0 - (data.y)/data.scale,
            x2: (i*data.size - data.x/data.scale) + ((data.x/data.scale)%data.size),
            y2: (data.height - data.y)/data.scale
        })
    }
    for(let i = 0; i <= (data.height/data.scale)/data.size + 1; i++){
        tab.push({
            x1: 0 - (data.x)/data.scale,
            y1: ((i*data.size - data.y/data.scale) + ((data.y/data.scale)%data.size)),
            x2: (data.width - data.x)/data.scale,
            y2: (i*data.size - data.y/data.scale) + ((data.y/data.scale)%data.size)
        })
    }
    return tab
}