#pragma once

#include "pch.h"

#include "..\..\codegen\NativePDFGenSpec.g.h"

#include <functional>
#define _USE_MATH_DEFINES
#include <math.h>
#include <fstream>
#include <iostream>
#include <sstream>

#include "NativeModules.h"

#include <shlwapi.h>

#include <winrt/Windows.Globalization.h>
#include <winrt/Windows.Globalization.DateTimeFormatting.h>
#include <winrt/Windows.Storage.h>

using namespace winrt;
using namespace Windows::Foundation;
using namespace Windows::Storage;
using namespace Windows::UI::Xaml;

namespace moradas_native
{
  using ModuleSpec = moradas_native_cpp::PDFGenSpec;

  REACT_MODULE(PDFGen);
  struct PDFGen
  {
    REACT_METHOD(ConvertHtmlToPdf, L"ConvertHtmlToPdf");
    std::string ConvertHtmlToPdf(std::string htmlFileName, std::string pdfFileName) noexcept
    {
      std::string wkhtmltopdfPath = winrt::to_string(Windows::Storage::ApplicationData::Current().LocalFolder().Path());

      std::stringstream ss;
      ss << wkhtmltopdfPath << "\\" << htmlFileName;
      std::string htmlFilePath = ss.str();
      ss.str("");
      ss << wkhtmltopdfPath << "\\" << pdfFileName;
      std::string pdfFilePath = ss.str();

      STARTUPINFO si;
      PROCESS_INFORMATION pi;

      ZeroMemory(&si, sizeof(si));
      si.cb = sizeof(si);
      ZeroMemory(&pi, sizeof(pi));

      ss.str("");
      ss << wkhtmltopdfPath << "\\wkhtmltopdf.exe --encoding utf-8 -g -s A6 -B 0 -L 0 -R 0 -T 0 " << htmlFilePath << " " << pdfFilePath;
      std::string str = ss.str();

      // make str work on CreateProcess' command line as LPWSTR
      wchar_t* cmd = new wchar_t[str.size() + 1];
      copy(str.begin(), str.end(), cmd);
      cmd[str.size()] = '\0';

      // Start the child process. 
      if (!CreateProcess(NULL,   // No module name (use command line)
          cmd,            // Command line
          NULL,           // Process handle not inheritable
          NULL,           // Thread handle not inheritable
          FALSE,          // Set handle inheritance to FALSE
          CREATE_NO_WINDOW,
          NULL,           // Use parent's environment block
          Windows::Storage::ApplicationData::Current().LocalFolder().Path().c_str(),
          &si,            // Pointer to STARTUPINFO structure
          &pi)            // Pointer to PROCESS_INFORMATION structure
          )
      {
          ss.str("");
          ss << "[ERR] CreateProcess failed (" << GetLastError() << ").\n" << str.c_str() << "\n";
          return ss.str();
      }

      // Wait until child process exits.
      WaitForSingleObject(pi.hProcess, INFINITE);

      return pdfFilePath;
    }
  };
}