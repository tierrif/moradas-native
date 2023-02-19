#include "pch.h"
#include "ReactPackageProvider.h"
#include "NativeModules.h"

#include "PDFGen.h"

using namespace winrt::Microsoft::ReactNative;

namespace winrt::moradas_native::implementation
{

void ReactPackageProvider::CreatePackage(IReactPackageBuilder const &packageBuilder) noexcept
{
    AddAttributedModules(packageBuilder, true);
}

} // namespace winrt::moradas_native::implementation
