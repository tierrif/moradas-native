
/*
 * This file is auto-generated from a NativeModule spec file in js.
 *
 * This is a C++ Spec class that should be used with MakeTurboModuleProvider to register native modules
 * in a way that also verifies at compile time that the native module matches the interface required
 * by the TurboModule JS spec.
 */
#pragma once

#include "NativeModules.h"
#include <tuple>

namespace moradas_native_cpp {

struct PDFGenSpec : winrt::Microsoft::ReactNative::TurboModuleSpec {
  static constexpr auto methods = std::tuple{
      SyncMethod<std::string(std::string, std::string) noexcept>{0, L"ConvertHtmlToPdf"},
  };

  template <class TModule>
  static constexpr void ValidateModule() noexcept {
    constexpr auto methodCheckResults = CheckMethods<TModule, PDFGenSpec>();

    REACT_SHOW_METHOD_SPEC_ERRORS(
          0,
          "ConvertHtmlToPdf",
          "    REACT_SYNC_METHOD(ConvertHtmlToPdf) std::string ConvertHtmlToPdf(std::string htmlFileName, std::string pdfFileName) noexcept { /* implementation */ }\n"
          "    REACT_SYNC_METHOD(ConvertHtmlToPdf) static std::string ConvertHtmlToPdf(std::string htmlFileName, std::string pdfFileName) noexcept { /* implementation */ }\n");
  }
};

} // namespace moradas_native_cpp
