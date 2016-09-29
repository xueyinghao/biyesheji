using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(EduProject.Startup))]
namespace EduProject
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
