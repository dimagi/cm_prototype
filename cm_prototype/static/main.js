      var templates = {
        form: "<div class='form'><div class='connection-controls'><h2 class='noselect'>Form</h2><a class='remove'><i class='fa fa-remove'></i></a></div><input class='name form-control form-control-sm' /><hr /><ol></ol><button class='add-question btn btn-primary btn-sm'>Add question</button></div>",
        question: "<li><textarea rows='2' class='form-control form-control-sm question' ></textarea><a class='remove'><i class='fa fa-remove'></i></a></li>",
        workflow: "<div class='workflow'><div class='connection-controls'><h2 class='noselect'>Linked Forms</h2><a class='remove'><i class='fa fa-remove'></i></a></div><div class='start'><span class='title'>\"Add\" Form</span><a href='#' class='toolbar-icon toolbar-icon-form'></a></div><div class='middle'><span class='title'>\"Update\" Forms</span><a href='#' class='toolbar-icon toolbar-icon-form'></a></div></div>",
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
            activeClass: 'ui-droppable-active',
            hoverClass: 'ui-droppable-hover',
          });
          $workflow.find(".start").droppable({
            accept: ".form",
            drop: dropForm,
            activeClass: 'ui-droppable-active',
            hoverClass: 'ui-droppable-hover',
          });
          $("#workspace").append($workflow);
        });

        // Add new form
        $(document).on("click", ".toolbar-icon-form", function() {
          var $form = $(templates.form),
              $icon = $(this),
              $start = $icon.closest(".start"),
              $middle = $icon.closest(".middle");
          $form.find("input").val("Form " + ($(".form").length + 1));
          $form.draggable({ revert: 'invalid', helper: 'clone', opacity: 0.7 });
          if ($start.length) {
            $start.append($form);
          } else if ($middle.length) {
            $middle.append($form);
          } else {
            $("#workspace").append($form);
          }
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
        $(document).on("click", ".form > .connection-controls > .remove", function() {
            if (confirm("Delete form?")) {
                $(this).closest(".form").remove();
            }
        });
        $(document).on("click", ".workflow > .connection-controls .remove", function() {
          if (confirm("Delete workflow?")) {
            $(this).closest(".workflow").remove();
          }
        });

        // Handle help
        $(".toolbar-icon-form").hover(function() {
            setHelp("<img src='public/image/form_hover_img.png' style='width: 400px;' />");
        }, function() {
            clearHelp();
        });
        $(".toolbar-icon-workflow").hover(function() {
            setHelp("<img src='public/image/link_hover_img.png' style='width: 700px;' />");
        }, function() {
            clearHelp();
        });

        $(document).on('mouseover', '.workflow .start', function() {
            if (!$(this).find(".form").length) {
                setHelp("<img src='public/image/add_hover_img.png' style='width: 250px;' />");
            }
        });
        $(document).on('mouseout', '.workflow .start', function() {
            clearHelp();
        });

        $(document).on('mouseover', '.workflow .middle', function() {
            if (!$(this).find(".form").length) {
                setHelp("<img src='public/image/update_hover_img.png' style='width: 335px;' />");
            }
        });
        $(document).on('mouseout', '.workflow .middle', function() {
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
