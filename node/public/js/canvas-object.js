function addImg(img){
    canvasType = "drag"
    let items = []
    let stageGrid = gridCoord({width: $('#container').width(), height: $('#container').height(), size: 16, scale: 1, x:0, y:0})
    for(let h = 0; h < img.length; h++){
        for(let t = 0; t < img[h].length; t++){
            const imageObj = new Image()
            imageObj.onload = function () {
                const mySprite = new Konva.Image({
                x: 16*t,
                y: 16*h,
                image: imageObj,
                name: img[h][t].id,
                })
                layer.add(mySprite)
                // layer.draw()
                items.push({obj: mySprite, x: 16*t, y: 16*h})
            }
            imageObj.src = img[h][t].image
        }
    }

    stage.off('mousemove')
    stage.on('mousemove', ()=>{
        for(let h = 0; h < items.length; h++){
            for(let o = 0; o < stageGrid.length; o++){
                if(stage.getRelativePointerPosition().x > stageGrid[o].x1 && stage.getRelativePointerPosition().x < stageGrid[o].x1 + tileWidth){
                    items[h].obj.x(stageGrid[o].x1 + items[h].x)
                }
                if(stage.getRelativePointerPosition().y > stageGrid[o].y1 && stage.getRelativePointerPosition().y < stageGrid[o].y1 + tileWidth){
                    items[h].obj.y(stageGrid[o].y1 + items[h].y)
                }
            }
        }
        layer.draw()
    })

    stage.on('click', ()=>{
        stage.off('mousemove')
        if(canvasType ==" drag"){
            canvasType = "none"
            const allObj = stage.getAllIntersections({x: stage.getRelativePointerPosition().x, y: stage.getRelativePointerPosition().y})
            if(allObj.length != 2){
                allObj[1].remove()
            }
        }
        layer.draw()
    })

}