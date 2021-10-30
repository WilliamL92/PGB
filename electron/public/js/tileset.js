function loadTileset(tab){
    $('#tilesetContent').children().remove()
    for(let p = 0; p < tab.length; p++){
        $('#tilesetContent').append(`<div id="showTileset_${p}" style="display: flex; flex-direction: row;">`)
        for(let u = 0; u < tab[p].length; u++){
            $(`#showTileset_${p}`).append(`<div id="tilesetSquare_${p}_${u}" class="tilesetImgContent" style="width: 18px; height: 18px; margin-left: 2px;"><img class="tilesetImg" style="display: block; z-index: 1;" src="${tab[p][u]}" draggable="false"></img></div>`)
            if(p == tab.length -1 && u == tab[p].length -1){
                $('.tilesetImgContent').off('click')
                $('.tilesetImgContent').off('mouseenter')
                $('.tilesetImgContent').off('mouseleave')
                $('.tilesetImgContent').on('mouseenter', (e)=>{
                    let _elem = $(e.target)
                    if(_elem.get(0).tagName != "DIV"){
                        _elem = $(e.target).parent()
                    }
                    $(`#${_elem.attr('id')}`).children().css('opacity', 0.4)
                })

                $('.tilesetImgContent').on('mouseleave', (e)=>{
                    if(tilesetDrag != "multiple"){
                        let _elem = $(e.target)
                    if(_elem.get(0).tagName != "DIV"){
                        _elem = $(e.target).parent()
                    }
                        $(`#${_elem.attr('id')}`).children().css('opacity', 1)
                    }
                })

                $('.tilesetImg').on('click', (e)=>{
                    spritesSelected = []
                    spritesSelected.push($(e.target).attr('src'))
                    if(tilesetDrag == "multiple"){
                        tilesetDrag = "none"
                    }
                    else if(tilesetDrag == "none"){
                        tilesetDrag = "multiple"
                    }
                    addImg()
                })
            }
        }
        $('#tilesetContent').append('</div>')
    }
}