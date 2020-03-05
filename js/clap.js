$(function () {
    /* Dark mode stuff */
    if (localStorage.getItem('darkmode') == 'true'){
        document.styleSheets[4].disabled = true;
        var isDarkMode = true;
    }
    else {
        var isDarkMode = false;
    }

    $('#btn-darkmode').click(function(){
        if (isDarkMode){
            document.styleSheets[4].disabled = false;
            this.innerHTML = "Dark Mode"
            localStorage.setItem('darkmode', 'false')
            isDarkMode = false
        }
        else{
            this.innerHTML = "Light Mode"
            document.styleSheets[4].disabled = true;
            localStorage.setItem('darkmode', 'true')
            isDarkMode = true
        }
    })

    /* Clapback stuff */
    $('#user-in').keyup(function () {
        $('#user-out').val(this.value.split(' ').join(' 👏 '));
    })

    $('#btn-clear').click(function() {
        $('#user-in').val('');
        $('#user-out').val('');
    })

    /* Sponge stuff */
    $('#sponge-in').keyup(function() {
        var newstr = "";
        for (var c of this.value){
            if (Math.floor(Math.random() * 101) > 50){
                newstr += c.toUpperCase();
            }
            else{
                newstr += c;
            }
        }
        $('#sponge-out').val(newstr)
    })

    /* Clipboard JS stuff */
    var clip = new ClipboardJS('.btn-copy');
    clip.on('success', function (e) {
        $.notify("Copied!", {
            position: "top-right",
            className: "success",
            showAnimation: "fadeIn",
            hideAnimation: "fadeOut"
        });
        console.info('Action:', e.action);
        console.info('Trigger:', e.trigger);

        e.clearSelection();
    });

    clip.on('error', function (e) {
        console.error('Action:', e.action);
        console.error('Trigger:', e.trigger);
    });
})