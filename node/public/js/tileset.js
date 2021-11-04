function loadTileset(tab){
    $('#tilesetContent').children().remove()
    for(let p = 0; p < tab.length; p++){
        $('#tilesetContent').append(`<div id="showTileset_${p}" style="display: flex; flex-direction: row;">`)
        for(let u = 0; u < tab[p].length; u++){
            $(`#showTileset_${p}`).append(`<div id="tilesetSquare_${tab[p][u].id}" class="tilesetImgContent" style="width: 18px; height: 18px; margin-left: 2px;"><img class="tilesetImg" style="display: block; z-index: 1;" src="${tab[p][u].image}" draggable="false"></img></div>`)
            if(p == tab.length -1 && u == tab[p].length -1){
                $('.tilesetImgContent').off('click')
                $('.tilesetImgContent').off('mouseenter')
                $('.tilesetImgContent').off('mouseleave')
                $('.tilesetImgContent').off('mousedown')
                $('.tilesetImgContent').off('mouseup')

                let firstIndex = 0
                let secondIndex = 0
                let imgTab = [[]]

                $('.tilesetImgContent').on('mouseenter', (e)=>{
                    let _elem = $(e.target)
                    if(_elem.get(0).tagName != "DIV"){
                        _elem = $(e.target).parent()
                    }
                    $(`#${_elem.attr('id')}`).children().css('opacity', 0.4)
                })

                $('.tilesetImgContent').on('mouseleave', (e)=>{
                    let _elem = $(e.target)
                    if(_elem.get(0).tagName != "DIV"){
                        _elem = $(e.target).parent()
                    }
                    if(tilesetDrag == "multiple"){
                        
                    }
                    else if(tilesetDrag == "none"){
                        $(`#${_elem.attr('id')}`).children().css('opacity', 1)
                    }
                })
                let mouseIsDown = false
                $('.tilesetImgContent').on('mousedown', (e)=>{
                    let _elem = $(e.target)
                    if(_elem.get(0).tagName != "DIV"){
                        _elem = $(e.target).parent()
                    }
                    tilesetDrag = "multiple"
                    firstIndex = _elem.attr('id').substring(14, _elem.attr('id').length)
                    mouseIsDown = true
                })

                $('.tilesetImgContent').on('mouseup', (e)=>{
                    let _elem = $(e.target)
                    if(_elem.get(0).tagName != "DIV"){
                        _elem = $(e.target).parent()
                    }
                    tilesetDrag = "none"
                    secondIndex = _elem.attr('id').substring(14, _elem.attr('id').length)
                    mouseIsDown = false
                    imgTab = generateSelectedTab(firstIndex, secondIndex)
                    addImg(imgTab)
                })
            }
        }
        $('#tilesetContent').append('</div>')
    }
}