$(function () {
    var isDarkMode = false;

    $('#user-in').keyup(function () {
        $('#user-out').val(this.value.split(' ').join(' 👏 '));
    })

    $('#btn-clear').click(function() {
        $('#user-in').val('');
        $('#user-out').val('');
    })
    
    $('#btn-darkmode').click(function(){
        if (isDarkMode){
            document.styleSheets[4].disabled = false;
            this.innerHTML = "Dark Mode"
            isDarkMode = false
        }
        else{
            this.innerHTML = "Light Mode"
            document.styleSheets[4].disabled = true;
            isDarkMode = true
        }
    })

    var clip = new ClipboardJS('#btn-copy');
    clip.on('success', function (e) {
        $('#user-out').notify("Copied!", {
            position: "right",
            className: "success"
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