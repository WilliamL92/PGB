$(window).on('load', ()=>{
    window.stage = new Konva.Stage({
    container: 'container',
    width: $('#container').width(),
    height: $('#container').height(),
    })

    window.layer = new Konva.Layer()

    window.background = new Konva.Rect({
        x: 0,
        y: 0,
        width: $('#container').width(),
        height: $('#container').height(),
        fill: '#000000',
        name: "background"
    })

    layer.add(background)

    layer.draw()

    stage.add(layer)

    $(window).on('resize', ()=>{
        stage.width($('#container').width())
        stage.height($('#container').height())
        background.width($('#container').width())
        background.height($('#container').height())
        stage.draw()
    })

})