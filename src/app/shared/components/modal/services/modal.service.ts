import {
  Injectable,
  inject,
  createComponent,
  ApplicationRef,
  EnvironmentInjector,
  ComponentRef,
  Type
} from "@angular/core";
import { FileInfo } from "../../../../file-table/model/file-info";
import { ModalComponent } from "../modal.component";
import {
  FileDownloadDialogComponent
} from "../../../../file-table/dialog/file-download-dialog/file-download-dialog.component";

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private readonly environmentInjector = inject(EnvironmentInjector);
  private readonly appRef = inject(ApplicationRef);

  private openedModal?: ComponentRef<ModalComponent> | null;

  openDownloadModal(downloadedFiles: FileInfo[], excludedFiles: FileInfo[]) {
    const fileDownloadDialogComponentRef = this.attachComponentToModal(FileDownloadDialogComponent)

    fileDownloadDialogComponentRef.setInput('downloadedFiles', downloadedFiles);
    fileDownloadDialogComponentRef.setInput('excludedFiles', excludedFiles);
  }

  closeModal(): void {
    this.openedModal?.hostView.destroy();
    this.openedModal = null;
  }

  isModalOpen(): boolean | undefined {
    return !!this.openedModal;
  }

  private attachComponentToModal(component: Type<any>): ComponentRef<any> {
    const modalComponentRef = createComponent(ModalComponent, { environmentInjector: this.environmentInjector });
    const componentRef = createComponent(component, { environmentInjector: this.environmentInjector });

    this.appRef.attachView(modalComponentRef.hostView);
    this.appRef.attachView(componentRef.hostView);

    this.attachComponentToView(modalComponentRef.location.nativeElement, componentRef.location.nativeElement);
    this.openedModal = modalComponentRef;

    return componentRef;
  }

  private attachComponentToView(modalElement: HTMLElement, componentElement: HTMLElement) {
    modalElement.prepend(componentElement);
    document.body.appendChild(modalElement);
  }
}
