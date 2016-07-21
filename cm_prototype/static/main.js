      var templates = {
        form: "<div class='form'><input class='name' /><a class='remove'>x</a><ol></ol><button class='add-question'>Add question</button></div>",
        question: "<li><input /><a class='remove'>x</a></li>",
        workflow: "<div class='workflow'><a class='remove'>x</a><div class='start'><span class='title'>Start Form</span></div><div class='middle'><span class='title'>Other Forms</span></div></div>",
      };
      var dropForm = function(event, ui) {
        var $form = $(ui.draggable);
        $form.css("top", 0);
        $form.css("left", 0);
        $(this).append($form);
      };
      var clearHelp = function() {
        $("#help").text("");
        $("#help").css("display", "none");
      };
      var setHelp = function(text) {
        $("#help").text(text);
        $("#help").css("display", "block");
      };
      $(document).ready(function() {
        $(".toolbar-icon-form").click(function() {
          var $form = $(templates.form);
          $form.find("input").val("Form " + ($(".form").length + 1));
          $form.draggable({ revert: true });
          $("#workspace").append($form);
        });
        $(".toolbar-icon-form").hover(function() {
            setHelp("[form help]");
        }, function() {
            clearHelp();
        });
        $(".toolbar-icon-workflow").hover(function() {
            setHelp("[workflow help]");
        }, function() {
            clearHelp();
        });
        $(document).on('mouseover', '.workflow .start', function() {
            if (!$(this).find(".form").length) {
                setHelp("[start help]");
            }
        });
        $(document).on('mouseout', '.workflow .start', function() {
            clearHelp();
        });
        $(".toolbar-icon-workflow").click(function() {
          var $workflow = $(templates.workflow);
          $workflow.find(".middle").droppable({
            accept: ".form",
            drop: dropForm,
          });
          $workflow.find(".start").droppable({
            accept: ".form",
            drop: dropForm,
          });
          $("#workspace").append($workflow);
        });
        $(document).on("click", ".add-question", function() {
          $(this).closest(".form").find("ol").append($(templates.question));
        });
        $(document).on("click", ".form ol li .remove", function() {
          $(this).closest("li").remove();
        });
        $(document).on("click", ".form > .remove", function() {
            if (confirm("Delete form?")) {
                $(this).closest(".form").remove();
            }
        });
        $(document).on("click", ".workflow > .remove", function() {
          if (confirm("Delete workflow?")) {
            $(this).closest(".workflow").remove();
          }
        });
        var $help = $("#help");
        $(document).on("mousemove", function(e) {
            if ($help.text().trim()) {
                $help.css("top", e.pageY + 10);
                $help.css("left", e.pageX + 10);
            }
        });
      });
