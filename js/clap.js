$(function () {
    /* imgflip spongebob meme id */
    const spongeID = 102156234;
    const memeURL = "http://api.imgflip.com/caption_image";
    /* Dark mode stuff */
    if (localStorage.getItem('darkmode') == 'true') {
        document.styleSheets[4].disabled = true;
        var isDarkMode = true;
    } else {
        var isDarkMode = false;
    }

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

    function jumble() {
        $('#sponge-out').val(document.getElementById('sponge-in').value.split('').map((v) =>
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

    $('#sponge-jumble').click(function () {
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

    $('#sponge-clear').click(function () {
        $('#sponge-in').val('');
        $('#sponge-out').val('');
    })

    /* Memeify */
    $('#sponge-memeify').click(function () {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
        
        var formdata = new FormData();
        formdata.append("template_id", 102156234);
        formdata.append("username", "naught0");
        formdata.append("password", "D2UsVjf#D1JJ");
        formdata.append("text0", $('#sponge-out').value);
        
        var requestOptions = {
          method: 'POST',
          mode: 'no-cors',
          headers: myHeaders,
          body: formdata,
          redirect: 'follow'
        };
        
        fetch("https://api.imgflip.com/caption_image?template_id=&password=D2UsVjf#D1JJ#D1JJ", requestOptions)
          .then(response => response.text())
          .then(result => $('#sponge-meme-link').attr('href', result))
          .catch(error => console.log('error', error));
    })
})