      var templates = {
        form: "<div class='form'><div class='connection-controls'><h2 class='noselect'>Form</h2><a class='remove'><i class='fa fa-remove'></i></a></div><input class='name form-control form-control-sm' /><hr /><ol></ol><button class='add-question btn btn-primary btn-sm'>Add question</button></div>",
        question: "<li><textarea rows='2' class='form-control form-control-sm question' ></textarea><a class='remove'><i class='fa fa-remove'></i></a></li>",
        workflow: "<div class='workflow'><div class='connection-controls'><h2 class='noselect'>Workflow</h2><a class='remove'><i class='fa fa-remove'></i></a></div><div class='start'><span class='title'>Start Form</span></div><div class='middle'><span class='title'>Other Forms</span></div></div>",
      };
      var dropForm = function(event, ui) {
        var $form = $(ui.draggable);
        $form.css("top", 0);
        $form.css("left", 0);
        $(this).append($form);
      };
      var clearHelp = function() {
        $("#help").html("");
        $("#help").css("display", "none");
      };
      var setHelp = function(text) {
        $("#help").html(text);
        console.log(text);
        $("#help").css("display", "inline-block");
      };

      // Event handling
      $(document).ready(function() {
        // Add new workflow
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

        // Add new form
        $(".toolbar-icon-form").click(function() {
          var $form = $(templates.form);
          $form.find("input").val("Form " + ($(".form").length + 1));
          $form.draggable({ revert: true });
          $("#workspace").append($form);
        });

        // Add new question to form
        $(document).on("click", ".add-question", function() {
          var $list = $(this).closest(".form").find("ol");
          $list.append($(templates.question));
          $list.find("input:last").focus();
        });

        // Remove questions, forms, workflows
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

        // Handle help
        $(".toolbar-icon-form").hover(function() {
            setHelp("<img src='public/image/form_hover_text.png' style='width: 300px;' />");
        }, function() {
            clearHelp();
        });
        $(".toolbar-icon-workflow").hover(function() {
            setHelp("<img src='public/image/workflow_hover_img.png' style='width: 600px;' />");
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

        var $help = $("#help");
        $(document).on("mousemove", function(e) {
            if ($help.text().trim() || $help.find("*").length) {
                $help.css("top", e.pageY + 10);
                $help.css("left", e.pageX + 10);
            }
        });
      });
