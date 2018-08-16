using System.IO.Compression;
using System.Linq;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.ResponseCompression;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using ToDoMVCApp.Data;
using ToDoMVCApp.Service.Interfaces;
using ToDoMVCApp.Service.Services;

namespace ToDoMVCApp
{
    public class Startup
    {
		public string _ToDoMVCAppDBString = null;

		public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
			_ToDoMVCAppDBString = Configuration["ToDoMVCAppDB:ConnectionString"];
			services.Configure<CookiePolicyOptions>(options =>
            {
                // This lambda determines whether user consent for non-essential cookies is needed for a given request.
                options.CheckConsentNeeded = context => true;
                options.MinimumSameSitePolicy = SameSiteMode.None;
            });
			services.Configure<GzipCompressionProviderOptions>(options => options.Level = CompressionLevel.Optimal);
			services.AddResponseCompression(options =>
			{
				options.EnableForHttps = true;
				options.Providers.Add<GzipCompressionProvider>();
			});
			services.AddDbContext<ApplicationContext>(options => options.UseSqlServer(_ToDoMVCAppDBString));
			services.AddTransient<IUserService, UserService>();
			services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_1);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
			app.UseResponseCompression();
			if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
                app.UseHsts();
            }

            app.UseHttpsRedirection();
			app.UseStaticFiles(new StaticFileOptions
			{
				OnPrepareResponse = content =>
				{
					if (content.File.Name.EndsWith(".js.gz"))
					{
						content.Context.Response.Headers.Append("Content-Type", "text/javascript");
						content.Context.Response.Headers.Append("Content-Encoding", "gzip");
					}
					else if (content.File.Name.EndsWith(".css.gz"))
					{
						content.Context.Response.Headers.Append("Content-Type", "text/css");
						content.Context.Response.Headers.Append("Content-Encoding", "gzip");
					}

				}
			});
			app.UseCookiePolicy();

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}");
            });
        }
    }
}
