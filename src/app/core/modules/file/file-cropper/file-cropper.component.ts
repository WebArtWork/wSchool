import { Component } from '@angular/core';
import { ImageCroppedEvent, ImageCropperModule } from 'ngx-image-cropper';
import { ButtonComponent } from '../../button/button.component';

@Component({
    selector: 'app-file-cropper',
    templateUrl: './file-cropper.component.html',
    styleUrl: './file-cropper.component.scss',
    imports: [ImageCropperModule, ButtonComponent]
})
export class FileCropperComponent {
	close: () => void;

	croppedDataUrl: string;

	dataUrl: string;

	width: number;

	height: number;

	uploadImage: (croppedDataUrl: string) => void;

	imageCropped(event: ImageCroppedEvent): void {
		this.croppedDataUrl = event.base64 as string;
	}
}
