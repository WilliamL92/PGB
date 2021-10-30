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

                $('.tilesetImgContent').on('mouseenter', (e)=>{
                    let _elem = $(e.target)
                    if(_elem.get(0).tagName != "DIV"){
                        _elem = $(e.target).parent()
                    }
                    $(`#${_elem.attr('id')}`).children().css('opacity', 0.4)
                    // spritesSelected.push($(_elem).children().attr('src'))
                })

                $('.tilesetImgContent').on('mouseleave', (e)=>{
                    let _elem = $(e.target)
                    if(_elem.get(0).tagName != "DIV"){
                        _elem = $(e.target).parent()
                    }
                    if(tilesetDrag != "multiple"){
                        $(`#${_elem.attr('id')}`).children().css('opacity', 1)
                    }
                    else{
                        const _index = spritesSelected.findValueInTab($(`#${_elem.attr('id')}`).children().attr('src'))
                        spritesSelected.splice(_index, 1)
                        addImg()
                    }
                })

                $('.tilesetImgContent').on('click', (e)=>{
                    $('#tilesetContent').children().find('img').css('opacity', 1)
                    let _elem = $(e.target)
                    if(_elem.get(0).tagName != "DIV"){
                        _elem = $(e.target).parent()
                    }
                    $(`#${_elem.attr('id')}`).children().css('opacity', 0.4)
                    spritesSelected = []
                    spritesSelected.push($(e.target).attr('src'))
                    tilesetDrag = "none"
                    addImg()
                })
                $('.tilesetImgContent').on('mousedown', (e)=>{
                    if(tilesetDrag == "multiple"){
                        tilesetDrag = "none"
                    }
                    else if(tilesetDrag == "none"){
                        tilesetDrag = "multiple"
                    }
                    addImg()
                })

                $('.tilesetImgContent').on('mouseup', (e)=>{
                    if(tilesetDrag == "multiple"){
                        tilesetDrag = "none"
                    }
                    else if(tilesetDrag == "none"){
                        tilesetDrag = "multiple"
                    }
                    
                })

            }
        }
        $('#tilesetContent').append('</div>')
    }
}