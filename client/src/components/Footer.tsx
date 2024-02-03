import React from "react";
import { BsGithub, BsLinkedin } from "react-icons/bs";

const Footer: React.FC = () => {
	return (
		<footer className="bg-gray-800 text-white py-12 mt-[10rem] flex flex-col w-full">
			<div className="mx-auto flex justify-between  items-center w-[90%]">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
					<div className="col-span-2 lg:col-span-1">
						<h2 className="text-2xl font-bold mb-4">Contact Us</h2>
						<p>Email: heyAshish902@gmail.com</p>
						<p>Phone: +(91) 8929495906</p>
						<p>
							Address: Manipal University Jaipur, Bagru-303007, Rajasthan, India
						</p>
					</div>
					<div>
						<h2 className="text-2xl font-bold mb-4">Products</h2>
						<ul>
							<li className="mb-2">
								<a href="/products/all">Smartphones</a>
							</li>
							<li className="mb-2">
								<a href="/products/all">Laptops</a>
							</li>
							<li className="mb-2">
								<a href="/products/all">Mobile Covers</a>
							</li>
							<li className="mb-2">
								<a href="/products/all">Headphones</a>
							</li>
						</ul>
					</div>
					<div>
						<h2 className="text-2xl font-bold mb-4">Services</h2>
						<ul>
							<li className="mb-2">
								<a href="/services">Photography</a>
							</li>
							<li className="mb-2">
								<a href="/services">Gym</a>
							</li>
							<li className="mb-2">
								<a href="/services">Lifestyle</a>
							</li>
							<li className="mb-2">
								<a href="/services">Interior Design</a>
							</li>
						</ul>
					</div>
					<div>
						<h2 className="text-2xl font-bold mb-4">Follow Us</h2>
						<ul className="flex space-x-4">
							<li>
								<a href="https://www.linkedin.com/in/ashish-gupta-2002/">
									<BsLinkedin
										style={{
											color: "#09dd6d",
										}}
									/>
								</a>
							</li>
							<li>
								<a href="https://github.com/heyAshish123">
									<BsGithub
										style={{
											color: "#09dd6d",
										}}
									/>
								</a>
							</li>
						</ul>
					</div>
				</div>
			</div>
			<div className="mt-8 text-center">
				<p>&copy; 2023 VirtuCart. All Rights Reserved.</p>
			</div>
		</footer>
	);
};

export default Footer;
