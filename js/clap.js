$(function () {
  /* nav stuff */
  // Check for click events on the navbar burger icon
  $(".navbar-burger").click(function () {
    // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
    $(".navbar-burger").toggleClass("is-active");
    $(".navbar-menu").toggleClass("is-active");
  });

  /* SPONGEBOB PLS */
  var fontSize = "18";
  var fontColor = "#ffffff";
  var impactFont = new FontFace("Impact", "url(font/impact.ttf)");
  impactFont.load().then((font) => {
    document.fonts.add(font);
  });
  var canvas = document.getElementById("sponge-img");
  var ctx = canvas.getContext("2d");
  var imageObj = new Image(640, 320);
  imageObj.src = "img/sponge.jpg";
  imageObj.onload = function () {
    drawSponge();
  };
  function clearSponge() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
  function drawSponge() {
    ctx.drawImage(
      imageObj,
      0,
      0,
      imageObj.width,
      imageObj.height,
      0,
      0,
      canvas.width,
      canvas.height
    );
    ctx.font = `${fontSize}pt Impact`;
    ctx.textAlign = "center";
    ctx.fillStyle = fontColor;
    ctx.fillText(
      document.getElementById("sponge-out").value,
      canvas.width / 2,
      canvas.height - 5,
      640
    );
  }
  // Copy image
  $("#spongeCopyImage").click(function () {
    canvas.toBlob((blob) =>
      navigator.clipboard.write([new ClipboardItem({ "image/png": blob })])
    );
  });

  if (localStorage.getItem("darkmode") == "true") {
    $("#btn-darkmode").html(function () {
      return `
            <span class="icon">
                <i class="fas fa-sun"></i>
            </span>
            <span>Light mode</span>
            `;
    });
    $("#lightTheme").prop("disabled", true);
    var isDarkMode = true;
  } else {
    $("#btn-darkmode").html(function () {
      return `
            <span class="icon">
                <i class="fas fa-moon"></i>
            </span>
            <span>Dark mode</span>
            `;
    });
    var isDarkMode = false;
  }

  $("#btn-darkmode").click(function () {
    if (isDarkMode) {
      $("#lightTheme").prop("disabled", false);
      this.innerHTML =
        "<span class='icon'><i class='fas fa-moon'></i></span><span>Dark mode</span>";
      localStorage.setItem("darkmode", "false");
      isDarkMode = false;
    } else {
      this.innerHTML =
        "<span class='icon'><i class='fas fa-sun'></i></span><span>Light mode</span>";
      $("#lightTheme").prop("disabled", true);
      localStorage.setItem("darkmode", "true");
      isDarkMode = true;
    }
  });

  /* Clipboard JS stuff */
  var clip = new ClipboardJS(".btn-copy");
  clip.on("success", function (e) {
    e.clearSelection();
  });

  clip.on("error", function (e) {
    console.error("Action:", e.action);
    console.error("Trigger:", e.trigger);
  });

  /* Clapback stuff */
  var emoji = "👏";
  function emojify() {
    $("#user-out").val($("#user-in").val().split(" ").join(` ${emoji} `));
  }
  function changemoji() {
    $("#changemoji .icon").text(emoji);
    $("#user-in").attr(
      "placeholder",
      "Enter some text ".split(" ").join(` ${emoji} `)
    );
  }
  changemoji();
  $(".emoji-picker").draggable({ cursor: "grab" });

  $("#user-in").keyup(emojify);
  $("#changemoji").click(function () {
    $(".emoji-picker").toggleClass("hidden");
  });
  $(".delete").click(function () {
    $(".emoji-picker").addClass("hidden");
  });
  $(document).keyup(function (e) {
    if (e.which === 27) {
      $(".emoji-picker").addClass("hidden");
    }
  });

  document
    .querySelector("emoji-picker")
    .addEventListener("emoji-click", (e) => {
      emoji = e.detail.unicode;
      emojify();
      changemoji();
    });

  $("#btn-clear").click(function () {
    $("#user-in").val("");
    $("#user-out").val("");
  });

  function jumble() {
    $("#sponge-out").val(
      document
        .getElementById("sponge-in")
        .value.split("")
        .map((v) =>
          Math.round(Math.random()) ? v.toUpperCase() : v.toLowerCase()
        )
        .join("")
    );
  }
  /* Sponge stuff */
  $("#sponge-in").keyup(
    delay(function (e) {
      // $('#sponge-out').val(this.value.split('').map((v) =>
      //     Math.round(Math.random()) ? v.toUpperCase() : v.toLowerCase()
      // ).join(''))
      jumble();
      drawSponge();
    }, 350)
  );

  $("#sponge-jumble").click(function () {
    jumble();
    clearSponge();
    drawSponge();
  });

  $(".btn-copy").click(function () {
    $(this).notify("Copied!", {
      className: "success",
      showAnimation: "fadeIn",
      hideAnimation: "fadeOut",
      gap: 5,
      position: "top-center",
    });
  });

  $("#sponge-clear").click(function () {
    $("#sponge-in").val("");
    $("#sponge-out").val("");
    drawSponge();
  });

  $("#sponge-font-size-box").on("input", function () {
    document.getElementById("sponge-font-size-slider").value = this.value;
    fontSize = this.value;
    clearSponge();
    drawSponge();
  });
  $("#sponge-font-size-slider").on("input", function () {
    document.getElementById("sponge-font-size-box").value = this.value;
    fontSize = this.value;
    clearSponge();
    drawSponge();
  });

  $("#sponge-color").on("input", function () {
    fontColor = this.value;
    clearSponge();
    drawSponge();
  });
});
