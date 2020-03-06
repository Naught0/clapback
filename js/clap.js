$(function () {
    /* Dark mode stuff */
    if (localStorage.getItem('darkmode') == 'true') {
        document.styleSheets[4].disabled = true;
        var isDarkMode = true;
    } else {
        var isDarkMode = false;
    }

    $('#btn-darkmode').click(function () {
        if (isDarkMode) {
            document.styleSheets[4].disabled = false;
            this.innerHTML = "Dark Mode"
            localStorage.setItem('darkmode', 'false')
            isDarkMode = false
        } else {
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

    $('#btn-clear').click(function () {
        $('#user-in').val('');
        $('#user-out').val('');
    })

    function jumble(){
        $('#sponge-out').val(document.getElementById('sponge-in').value.split('').map((v)=>
            Math.round(Math.random()) ? v.toUpperCase() : v.toLowerCase()
            ).join(''))
    }
    /* Sponge stuff */
    $('#sponge-in').keyup(delay(function (e) {
        // $('#sponge-out').val(this.value.split('').map((v) =>
        //     Math.round(Math.random()) ? v.toUpperCase() : v.toLowerCase()
        // ).join(''))
        jumble();
    }, 350));

    $('#sponge-jumble').click(function() {
        jumble();
    })

    $('.btn-copy').click(function () {
        $(this).notify("Copied!", {
            className: "success",
            showAnimation: "fadeIn",
            hideAnimation: "fadeOut",
            gap: 5,
            position: "top-middle"
        })
    })

    $('#sponge-clear').click(function(){ 
        $('#sponge-in').val('');
        $('#sponge-out').val('');
    })

    /* Clipboard JS stuff */
    var clip = new ClipboardJS('.btn-copy');
    clip.on('success', function (e) {
        console.info('Action:', e.action);
        console.info('Trigger:', e.trigger);

        e.clearSelection();
    });

    clip.on('error', function (e) {
        console.error('Action:', e.action);
        console.error('Trigger:', e.trigger);
    });
})