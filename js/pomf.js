$(function () {
	var uploadInput = $('#upload-input')
	  , uploadBtn = $('#upload-btn')
	  , uploadFiles = $('#upload-filelist')

	var btnContent = ""

	if (!$.hasFileAPI()) {
		$('#no-file-api').show()
		uploadBtn.hide()
	}

	uploadBtn.cabinet(uploadInput)

	uploadBtn.on('dragenter', function (e) {
		if (this === e.target) {
			$(this).addClass('drop')
			btnContent = $(this).html()
			$(this).html('Drop it here~')
		}
	})

	uploadBtn.on('drop', function (e) {
		$(this).trigger('dragleave')
	})

	uploadBtn.on('dragleave', function (e) {
		node = e.target
		do {
			if (node === this) {
				$(this).removeClass('drop')
				$(this).html(btnContent)
				break
			}
		} while (node = node.parentNode)
	})

	var MAX_SIZE = (function (node) {
		var max = node.attr('data-max-size') || '10MiB'
		var num = parseInt(/([0-9,]+).*/.exec(max)[1].replace(',', ''))
		var unit = /(?:([KMGTPEZY])(i)?B|([BKMGTPEZY]))/.exec(max) || ["B","",""]

		var oneUnit = Math.pow(
			(unit[2] === "i" ? 1024 : 1000),
			'BKMGTPEZY'.indexOf(unit[1])
		)

		return num * oneUnit
	})(uploadInput)

	var createRow = function (filename, size, extra) {
		var rowItem = $('<li class=file>')
		  , rowName = $('<span class=file-name>')
		  , rowPerc = $('<span class=file-percent>')
		  , rowProg = $('<div class="file-progress progress-outer">')
		  , rowSize = $('<span class=file-size>')
		  , rowUrl  = $('<span class=file-url>')

		rowItem.addClass(extra || '')

		$('<div class=progress-inner>').appendTo(rowProg)

		rowItem.attr('data-filename', escape(filename))
		rowName.text(filename)
		rowPerc.text("0%")
		rowSize.text(size)

		rowItem.append(rowName, rowPerc, rowProg, rowSize, rowUrl)

		return rowItem
	}

	uploadBtn.on('change', function (e) {
		uploadFiles.empty().removeClass('error completed')

		var files = uploadInput[0].filelist;

		files.forEach(function (file) {
			createRow(file.name, file.humanSize).appendTo(uploadFiles)
		})

		var totalRow = createRow('', files.humanSize, 'total')
		totalRow.appendTo(uploadFiles)

		if (files.size > MAX_SIZE) {
			uploadFiles.addClass('error')

			$('.file-name', totalRow).text('onii-chan y-your upload is t-too big&hellip;')
			return
		}

		var up = files.upload("upload.php")

		var eachRow = function (files, fn) {
			var hits = {}
			files.forEach(function (file) {
				++hits[file.name] || (hits[file.name] = 0)
				var row = $($('li[data-filename="' + escape(file.name) + '"]')[hits[file.name] || 0])
				fn.call(row, row, file, files)
			})
		}

		var totalName = $('.file-name', totalRow)

		up.on('uploadprogress', function (e, files) {
			eachRow(files, function (row, file, files) {
				var progress = (file.percentUploaded * 100) + '%';
				$('.file-percent', row).text(progress)
				$('.progress-inner', row).width(progress)
			})
			$('.progress-inner', totalRow).width((files.percentUploaded * 100) + '%')
		})

		up.on('uploadcomplete', function (e) {
			$('.file-percent').text('100%')
			$('.progress-inner').width('100%')
			totalName.text('Grabbing URLs...')
		})

		up.on('load', function (e, res) {
			switch (e.target.status) {
				case 200:
					var res = JSON.parse(res)
					if (!res.success) {
						uploadFiles.addClass('error')
						$('.file-name', totalRow).text('Something went wrong; try again later.')
						break
					}
					eachRow(res.files, function (row, file, files) {
						var link = $('<a>')

						link.attr('href', 'http://a.pomf.se/' + file.url)
							.attr('target', '_BLANK')
							.text('a.pomf.se/' + file.url)

						$('.file-url', row).append(link)
					})
					uploadFiles.addClass('completed')
					totalName.text('Done!')
					break
				case 413:
					uploadFiles.addClass('error completed')
					totalName.html('onii-chan, y-your upload is t-too big&hellip;')
					break
				default:
					uploadFiles.addClass('error completed')
					totalName.text('Something went wrong; try again later.')
			}
		})
		up.upload()
	})
})
