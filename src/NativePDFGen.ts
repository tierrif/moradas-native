import type { TurboModule } from 'react-native/Libraries/TurboModule/RCTExport'
import { TurboModuleRegistry } from 'react-native'

export interface Spec extends TurboModule {
  ConvertHtmlToPdf(htmlFileName: string, pdfFileName: string): string
}

export default TurboModuleRegistry.get<Spec>('PDFGen') as Spec | null
