var globalConfig = {
	//  홈 URL
	userUrl: {
		//			"T": ["/std/todo", "/prof/myLecture"], // 홈
		T: ["/home"], // 홈
		S: ["/std/lecture", "/prof/lecture"] // 강의실
	},

	// 개발 여부
	//		isDev: true,
	isDev: false,

	// datepicker option
	datepickerOption: function (option) {
		var _option = {
			autoclose: true,
			format: "yyyy-mm-dd",
			zIndexOffset: 10000,
			language: "ko",
			todayHighlight: true
		};

		if (typeof option == "object") {
			_option = $.extend(_option, option);
		}
		return _option;
	},

	// clockpicker option
	clockpickerOption: function (option) {
		var _option = {
			autoclose: true,
			default: "00:00",
			placement: "bottom",
			align: "left"
		};

		if (typeof option == "object") {
			_option = $.extend(true, _option, option);
		}

		return _option;
	},
	//timepicker option
	timepicker: {
		//22.02.08 시간(시, 분)이 10이하일때 00:00 형식으로 만들어주는 기능
		setTimeOption: function (e) {
			var setHour = "0";
			var setMinute = "0";
			var timeSetting;
			if (parseInt(e.minute) < 10) {
				setMinute += e.minute;
			} else {
				setMinute = e.minute;
			}
			if (parseInt(e.hour) < 10) {
				setHour += e.hour;
			} else {
				setHour = e.hour;
			}
			return (timeSetting = setHour + ":" + setMinute);
		},
		//TimePicker  만들어주는 기능, popUp동작
		setTimePicker: function (option) {
			$(option.inputId).prop("readonly", true);

			var setSpinbox = new tui.TimePicker(option.spinboxId, {
				initialHour: 0,
				initialMinute: 0,
				format: "h:m",
				inputType: "spinbox",
				showMeridiem: false
			});

			setSpinbox.on("change", (e) => {
				$(option.inputId).val(globalConfig.timepicker.setTimeOption(e));
			});
			$(option.inputId).off("click.input");
			$(option.inputId).on("click.input", function (e) {
				$(option.inputId)
					.closest(".formWrap")
					.find(".timePickerPop:not('" + option.timePopClass + "')")
					.removeClass("active");
				e.stopPropagation();
				if ($(option.timePopClass).hasClass("active")) {
					$(option.timePopClass).removeClass("active");
				} else {
					$(option.timePopClass).addClass("active");
					$(document).off("click.offTimePop");
					$(document).on("click.offTimePop", "#wrapper", globalConfig.timepicker.removeTimePicker);
				}
			});
			return setSpinbox;
		},
		// popUp 이외에 다른 곳 클릭 시 Timepicker 꺼지는 기능
		removeTimePicker: function (e) {
			if (!$(".timePickerPop").has(e.target).length) {
				$(".timePickerPop").removeClass("active");
				$(document).off("click.offTimePop", "#wrapper", globalConfig.timepicker.removeTimePicker);
			}
		},
		// text 와 timepicker 동기화 기능
		inputTime: function (spinbox, getTime) {
			if (getTime) {
				var strArray = getTime.split(":");
				spinbox.setTime(parseInt(strArray[0]), parseInt(strArray[1]));
			}
		}
	},

	/**
	 * 타입별 업로드를 허용하는 확장자 또는 mime
	 */
	acceptFile: {
		VIDEO: "video/*",
		PICTURE: "image/*",
		DOCUMENT: "application/*",
		FILE: "application/*",
		HWP: ".hwp",
		EXCEL: ".xlsx"
	},

	/**
	 * LMS 업로드 가능 타입
	 */
	lmsAccept: ["image/*", "text/*", "application/*", ".hwp"],

	/**
	 * 파놉토 새창 열기
	 */
	openPanopto: function () {
		comm.send("/univ/getPanoptoUrl", null, "post", function (data) {
			var url = "https://" + data.panopto_url;
			var name = getMessage("prof.learningElements.manage.panopto");

			//IOS장비의 경우 팝업창을 지정하여 해당팝업창에 로그인 후 로그인된 팝업창을 열어줌
			if (util.getIosCheck()) {
				globalConfig.loginPanopto(topbar.userInfo, "Y");
				setTimeout(window.open(url, "IosTab"), 500);
			} else {
				window.open(url, "_blank");
			}
		});			
		
		return false;
	},

	viewStudentMode: function (fg) {
		var currCourseInfo = sessionStorage.getItem("currentCourseData");
		if (currCourseInfo) {
			var courseJson = JSON.parse(currCourseInfo);
			var termCD = courseJson.term_cd;
			var termYear = courseJson.term_year;
			var courseID = courseJson.course_id;

			var param = {};
			param["course_id"] = courseID;
			param["term_cd"] = termCD;
			param["term_year"] = termYear;
			if (fg) {
				param["userMode"] = "Y";
			} else {
				param["userMode"] = "N";
			}

			if (!fg) {
				var userMode = localStorage.getItem("userMode");
				param["user_type"] = userMode;
			}

			var url = "/course/changeProfMode";
			comm.send(url, param, "post", function (json) {
				var url_v = "/common/changeUserRole";
				var data_v = {};
				if (fg) {
					data_v["role_no"] = "5";
					localStorage.setItem("userMode", topbar.userInfo.user_type);
				} else {
					//						data_v["role_no"] = userMode;
					data_v["role_no"] = "3";
					localStorage.removeItem("userMode");
				}
				
				data_v["userMode"] = param["userMode"];
				
				console.log("changeUserRole");
				console.log(data_v);

				comm.send(url_v, data_v, "post", function (json) {
					_hLog("changeUserRole result=" + JSON.stringify(json));
					if (json) {
						if (json.result == "1") {
							if (fg) {
								document.location.href = "/std/lecture";
							} else {
								document.location.href = "/prof/lecture";
							}
						}
					}
				});
			});
			return false;
		} else {
			alert(getMessage("common.alert.subjectReSelect"));
		}
	},

	openCms: function () {
		var url = util.getCmsUrl();
		window.open(url, "_blank");
		return false;
	},
	
	openCdms: function () {
		var url = util.getCdmsUrl();
		window.open(url, "_blank");
		return false;
	},
	
};
